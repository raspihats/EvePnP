from ..dao import actuators_dao
from .controllers import controllers_service


class ActuatorsService(object):

    def _load_func(self, code):
        def func(value=None):
            _globals = {}
            _locals = {
                'controller': controllers_service.controllers,
                'value': value,
                'result': None}
            exec(code, _globals, _locals)
            return _locals['result']
        return func

    def get_values_list(self):
        actuators = actuators_dao.get_list()
        for actuator in actuators:
            f = self._load_func(actuator['get_code'])
            actuator['value'] = f()
        return actuators

    def get_value(self, id):
        actuator = actuators_dao.get(id)
        actuator['value'] = 0
        return None

    def update_value(self, id, data):
        actuator = actuators_dao.get(id)
        # update value
        return actuator


actuators_service = ActuatorsService()
