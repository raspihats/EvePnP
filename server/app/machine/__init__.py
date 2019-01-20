class Machine(object):

    def __init__(self):
        super().__init__()
        self.controllers = {}

    def open(self, config):
        self.config = config
        self.loadControllers(config)
        self.loadActuators(config)

    def loadControllers(self, config):
        for controller in config['controllers']:
            if controller['name'] == 'grbl':
                from .controllers import grbl
                grbl = grbl.Grbl()
                # add 'axis' form main config to controller config
                controller['axis'] = config['axis']
                grbl.open(controller)
                self.controllers['grbl'] = grbl
            else:
                raise Exception("Unknown controller type: {}".format(
                    config['controller']['name']))

    def loadActuators(self, config):
        self.actuators = config['actuators']

    # @property
    # def position(self):
    #     return self.controller.position

    def home(self):
        self.controllers['grbl'].home()
        self.park([{'id': 'z'}])
        self.park([{'id': 'x'}, {'id': 'y'}])
        self.park([{'id': 'a'}, {'id': 'b'}])

    def park(self, axis_list, speed_factor=1):
        # add park position to axis in axis_list and determine minimum feed_rate
        min_feed_rate = None
        for axis_config in self.config['axis']:
            for axis in axis_list:
                if axis['id'] == axis_config['id']:
                    axis['position'] = axis_config['park']
                    if min_feed_rate is None or min_feed_rate > axis_config['feed_rate']:
                        min_feed_rate = axis_config['feed_rate']
        self.controllers['grbl'].move(axis_list, min_feed_rate * speed_factor)

    def jog(self, axis, speed_factor=1):
        feed_rate = None
        for axis_config in self.config['axis']:
            if axis['id'] == axis_config['id']:
                feed_rate = axis_config['feed_rate']
        self.controllers['grbl'].jog(axis, feed_rate * speed_factor)


machine = Machine()
