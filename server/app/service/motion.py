from ..dao import axis_dao
from .controllers import controllers_service


class MotionService(object):

    def home(self):
        controllers_service.motion_controller.home()
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
        controllers_service.motion_controller.move(
            axis_list, min_feed_rate * speed_factor)

    def jog(self, axis, speed_factor=1):
        feed_rate = None
        for axis_config in axis_dao.get_list():
            if axis['id'] == axis_config['id']:
                feed_rate = axis_config['feed_rate']
        controllers_service.motion_controller.jog(
            axis, feed_rate * speed_factor)

    def move(self, axis_list, speed_factor=1):
        min_feed_rate = None
        for axis_config in axis_dao.get_list():
            for axis in axis_list:
                if axis['id'] == axis_config['id']:
                    if min_feed_rate is None or min_feed_rate > axis_config['feed_rate']:
                        min_feed_rate = axis_config['feed_rate']
        controllers_service.motion_controller.move(
            axis_list, min_feed_rate * speed_factor)

    def move_safe(self, axis_list, speed_factor=1):
        self.park([{'id': 'z'}])

        z_axis = None
        for axis in axis_list:
            if axis['id'] == 'z':
                z_axis = axis
                break
        axis_list.remove(z_axis)

        self.move(axis_list, speed_factor)
        self.move([z_axis], speed_factor)

    def get_position(self):
        position = controllers_service.motion_controller.position
        response = []
        for axis_config in axis_dao.get_list():
            _id = axis_config['id']
            if _id in position:
                response.append({'id': _id,  'position': position[_id]})
        return response


motion_service = MotionService()
