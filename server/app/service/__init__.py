from .motion import MotionService
# from .axis import AxisService


motion_service = MotionService()
# axis_service = AxisService()


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


machine = Machine()
