from ..dao import controllers_dao, axis_dao


class ControllersService(object):
    def __init__(self):
        self.controllers = {}
        self.motion_controller = None
        self.load()
        controllers_dao.register_on_change(lambda: self.load())

    def load(self):
        for controller in controllers_dao.get_list():
            if controller['type'] == 'motion':
                if controller['driver'] == 'grbl':
                    from ..drivers import grbl
                    # add 'axis' to controller config
                    axis = {}
                    for a in axis_dao.get_list():
                        _id = a.pop('id')
                        axis[_id] = a
                    controller['axis'] = axis
                    grbl = grbl.Grbl(controller)
                    self.motion_controller = grbl
                    self.controllers[controller['id']] = grbl
                    return


controllers_service = ControllersService()
