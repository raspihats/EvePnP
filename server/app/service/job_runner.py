import gevent
from ..dao import feeders_dao
from .controllers import controllers_service


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
        self._placed = []
        self._pause = False
        self._stop = False

    def start(self, job):
        if self._job is None:
            self._job = job
            gevent.spawn(lambda: self._run())
        else:
            raise Exception("Job {} is already running".format(self._job.id))

    def pause(self):
        self._pause = True

    def stop(self):
        self._stop = True

    def getProgress(self):
        _id = self._job['id'] if self._job is not None else None
        return {
            'id': _id,
            'placed': self._placed
        }

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
            return feeders_pvm[0]

        # search for value match
        feeders_vm = [x for x in feeders if component['value']
                      in x['component']['value']]
        if len(feeders_vm) > 0:
            return feeders_vm[0]

        raise self.FeederNotFoundError("Can't find feeder for: {} {} {}".format(
            component['id'], component['value'], component['package']))

    def _pick(self, component):
        feeder = self._select_feeder(component)
        if feeder is not None:
            _globals = {}
            _locals = {}
            exec(feeder['code'], _globals, _locals)
            get_point = _locals['get_point']

            point = get_point(
                dict(feeder['point']), feeder['count'], feeder['size'])
            print(point)
            z = point.pop('z', None)

            controllers_service.motion_controller.move(
                point, 25000)
            controllers_service.motion_controller.move(
                {'z': z}, 10000)
            controllers_service.motion_controller.move(
                {'z': 59}, 10000)

            feeder['count'] -= 1
            feeders_dao.update(feeder['id'], feeder)

            return True

        return False

    def _place(self, board, component):
        point = dict(board['origin'])
        point['x'] += component['offset']['x']
        point['y'] += component['offset']['y']
        z = point.pop('z', None)

        controllers_service.motion_controller.move(
            point, 25000)
        controllers_service.motion_controller.move(
            {'z': z}, 10000)
        controllers_service.motion_controller.move(
            {'z': 59}, 10000)

    def _run(self):
        self._pause = False
        self._stop = False
        self._placed = []

        print("Starting job: {}".format(self._job['id']))

        for board in self._job['boards']:
            if board['operation'] == 'place':
                for component in self._job['components']:
                    if component['operation'] == 'place':
                        if self._stop:
                            self._job = None
                            return
                        if not self._pause:
                            print("part: {}".format(component['id']))
                            try:
                                self._pick(component)
                                self._place(board, component)
                            except self.FeederNotFoundError as e:
                                print(e)

                        gevent.sleep(0.1)

        print("Finished job: {}".format(self._job['id']))
        self._job = None


job_runner_service = JobRunnerService()
