from ..dao import controllers_dao
from ..dao import axis_dao


class MotionService(object):

    def __init__(self):
        self.motion_controller = None

        def on_change():
            for controller in controllers_dao.get_list():
                if controller['type'] == 'motion':
                    if controller['driver'] == 'grbl':
                        # from ..drivers import grbl
                        # grbl = grbl.Grbl()
                        # # add 'axis' controller config
                        # controller['axis'] = axis_dao.get_list()
                        # grbl.open(controller)
                        # self.motion_controller = grbl
                        return

            raise Exception("Can't install controller")

        controllers_dao.register_on_change(on_change)

    def home(self):
        self.motion_controller.home()
        self.park([{'id': 'z'}])
        self.park([{'id': 'x'}, {'id': 'y'}])
        self.park([{'id': 'a'}, {'id': 'b'}])

    def park(self, axis_list, speed_factor=1):
        # add park position to axis in axis_list and determine minimum feed_rate
        min_feed_rate = None
        for axis_config in axis_dao.get_list():
            for axis in axis_list:
                if axis['id'] == axis_config['id']:
                    axis['position'] = axis_config['park']
                    if min_feed_rate is None or min_feed_rate > axis_config['feed_rate']:
                        min_feed_rate = axis_config['feed_rate']
        self.motion_controller.move(axis_list, min_feed_rate * speed_factor)

    def jog(self, axis, speed_factor=1):
        feed_rate = None
        for axis_config in axis_dao.get_list():
            if axis['id'] == axis_config['id']:
                feed_rate = axis_config['feed_rate']
        self.motion_controller.jog(axis, feed_rate * speed_factor)

    def move(self, axis_list, speed_factor=1):
        min_feed_rate = None
        for axis_config in axis_dao.get_list():
            for axis in axis_list:
                if axis['id'] == axis_config['id']:
                    if min_feed_rate is None or min_feed_rate > axis_config['feed_rate']:
                        min_feed_rate = axis_config['feed_rate']
        self.motion_controller.move(axis_list, min_feed_rate * speed_factor)
