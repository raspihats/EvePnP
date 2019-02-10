import gevent
from ..dao import axis_dao, head_dao, feeders_dao, packages_dao, jobs_dao
from .controllers import controllers_service
from .actuators import actuators_service
from .motion import motion_service


class DictKeysToObjectProps(object):
    def __init__(self, config):
        self._config = dict(config)

    def __getattr__(self, attribute):
        return self._config[attribute]


def add_points(p1, p2):
    result = dict(p1)
    for key in p2:
        if key in p1:
            result[key] = p1[key] + p2[key]
        else:
            result[key] = p2[key]
    return result


def copy_keys(source, dest, omit):
    for key in omit:
        source.pop(key, None)
    for key in source:
        if key not in dest:
            dest[key] = source[key]


def run_func(target, name, *args, **kwargs):
    axis = {}
    for axis_config in axis_dao.get_list():
        axis[axis_config['id']] = DictKeysToObjectProps(axis_config)

    _globals = dict(target)
    _globals['controllers'] = controllers_service.controllers
    _globals['actuators'] = actuators_service.actuators
    _globals['axis'] = axis

    _locals = {}
    exec(target['code'], _globals, _locals)
    func = _locals[name]
    return func(*args, **kwargs)


class Package(object):
    def __init__(self, config):
        self._config = dict(config)

    def __getattr__(self, attribute):
        return self._config[attribute]


class Feeder(object):
    def __init__(self, config):
        self._config = config

    def get_point(self):
        _globals = {}
        _locals = {}
        exec(self._config['code'], _globals, _locals)
        get_point = _locals['get_point']

        point = get_point(
            dict(self._config['point']), self._config['count'], self._config['size'])
        self._config['count'] -= 1
        feeders_dao.update(self._config['id'], self._config)
        return point


class Head(object):
    class FullException(Exception):
        def __init__(self, *args, **kwargs):
            Exception.__init__(self, *args, **kwargs)

    class EmptyException(Exception):
        def __init__(self, *args, **kwargs):
            Exception.__init__(self, *args, **kwargs)

    class PlacementHead(object):
        def __init__(self, config):
            self._config = config
            self._component = None

        def isEmpty(self):
            return self._component == None

        def pick(self, component):
            point = add_points(
                component['pick_point'], self._config['offset'])

            print('Pick point: {}'.format(point))

            run_func(self._config, 'pick', point)
            self._component = component

        def place(self):
            point = add_points(
                self._component['place_point'], self._config['offset'])
            rotation = self._component['rotation']

            package = Package(packages_dao.get(self._component['package']))
            point['z'] += package.height

            print('Place point: {} {}'.format(point, rotation))

            run_func(self._config, 'place', point, rotation)
            placed_component = self._component
            self._component = None
            return placed_component

    def __init__(self):
        self._config = head_dao.get_first()
        self.placement_heads = []
        for ph_config in self._config['placement_heads']:
            # migrate some config keys from head to placement head
            copy_keys(self._config, ph_config, omit=[
                      'placement_heads', 'cameras'])
            self.placement_heads.append(Head.PlacementHead(ph_config))

    def pick(self, component):
        for ph in self.placement_heads:
            if ph.isEmpty():
                ph.pick(component)
                return
        raise self.FullException()

    def place(self):
        for ph in self.placement_heads:
            if not ph.isEmpty():
                return ph.place()
        raise self.EmptyException()

    def isLoaded(self):
        for ph in self.placement_heads:
            if ph.isEmpty():
                return False
        return True

    def isEmpty(self):
        for ph in self.placement_heads:
            if not ph.isEmpty():
                return False
        return True


class JobRunnerService(object):
    class FeederNotFoundError(Exception):
        def __init__(self, *args, **kwargs):
            Exception.__init__(self, *args, **kwargs)

    class PickError(Exception):
        def __init__(self, *args, **kwargs):
            Exception.__init__(self, *args, **kwargs)

    class PlaceError(Exception):
        def __init__(self, *args, **kwargs):
            Exception.__init__(self, *args, **kwargs)

    def __init__(self):
        self._job = None
        self._progress = {'id': None}
        self._pause = False
        self._stop = False
        self._head = Head()

    def start(self, id):
        if self._job is None:
            self._job = jobs_dao.get(id)
            gevent.spawn(lambda: self._run())
        elif self._pause:
            self._pause = False
        else:
            raise Exception("Job {} is already running".format(self._job.id))

    def pause(self, id):
        if self._job is not None:
            if self._job['id'] == id:
                self._pause = True

    def stop(self, id):
        if self._job is not None:
            if self._job['id'] == id:
                self._stop = True

    def get_progress(self):
        return self._progress

    def _select_feeder(self, component):
        from tinydb import Query
        # search for matching packages
        q = Query()['component']['package'] == component['package']
        feeders = feeders_dao.search(q)

        # discard empty feeders
        feeders = [x for x in feeders if x['count'] > 0]

        # search for matching values

        # search for perfect value match
        feeders_pvm = [x for x in feeders if x['component']
                       ['value'] == component['value']]
        if len(feeders_pvm) > 0:
            return Feeder(feeders_pvm[0])

        # search for value match
        feeders_vm = [x for x in feeders if component['value']
                      in x['component']['value']]

        for feeder in feeders_vm:
            if component['value'] == feeder['component']['value'].split(' ')[0]:
                return Feeder(feeder)

        if len(feeders_vm) > 0:
            return Feeder(feeders_vm[0])

        raise self.FeederNotFoundError("Can't find feeder for: {} {} {}".format(
            component['id'], component['value'], component['package']))

    def _run(self):
        self._pause = False
        self._stop = False
        self._progress = {
            'id': self._job['id'],
            'boards': []
        }

        print("Starting job: {}".format(self._job['id']))
        actuators_service.actuators['VacuumPump'].set(True)

        motion_service.park([{'id': 'z'}])
        motion_service.park([{'id': 'x'}, {'id': 'y'}])

        # build new boards list including only the ones that should be placed
        boards = [x for x in self._job['boards'] if x['operation'] == 'place']

        for board in boards:
            board_progress = {'id': board['id'], 'components_ids': []}
            self._progress['boards'].append(board_progress)

            # build new components list including only the ones that should be placed
            components = [x for x in self._job['components']
                          if x['operation'] == 'place']

            # sort components, group them using packages and values
            components.sort(key=lambda x: '{} {}'.format(
                x['package'], x['value']))

            while len(components):
                if self._stop:
                    self._job = None
                    break

                if not self._pause:
                    # pick multiple components
                    while not self._head.isLoaded() and len(components):
                        component = components[0]
                        try:
                            feeder = self._select_feeder(component)
                            component['pick_point'] = feeder.get_point()
                            component['place_point'] = add_points(
                                board['origin'], component['offset'])
                            self._head.pick(component)
                        except self.FeederNotFoundError as e:
                            print(e)
                        finally:
                            components.remove(component)

                    # place multiple components
                    while not self._head.isEmpty():
                        placed_component = self._head.place()
                        board_progress['components_ids'].append(
                            placed_component['id'])

                gevent.sleep(0.1)

        motion_service.park([{'id': 'z'}])
        motion_service.park([{'id': 'x'}, {'id': 'y'}])

        actuators_service.actuators['VacuumPump'].set(False)

        print("Finished job: {}".format(self._job['id']))
        self._job = None


job_runner_service = JobRunnerService()
