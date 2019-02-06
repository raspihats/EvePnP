from ..dao import actuators_dao
from .controllers import controllers_service


class Actuator(object):
    def __init__(self, config):
        self._config = dict(config)
        self.set(self._config['initial_value'])

    def __getattr__(self, attribute):
        return self._config[attribute]

    def set(self, value):
        _locals = {}
        exec(self._config['code'], {
            'controllers': controllers_service.controllers,
        }, _locals)
        _locals['set'](value)

    def get(self):
        _locals = {}
        exec(self._config['code'], {
            'controllers': controllers_service.controllers,
        }, _locals)
        return _locals['get']()


class ActuatorsService(object):
    def __init__(self):
        self.actuators = {}
        self.load_config()

    def load_config(self):
        for actuator_config in actuators_dao.get_list():
            self.actuators[actuator_config['id']] = Actuator(actuator_config)

    def get_values_list(self):
        actuators = []
        for _id, _actuator in self.actuators:
            actuators.append({
                'id': _actuator.id,
                'type': _actuator.type,
                'value': _actuator.get()
            })

    def get_value(self, id):
        actuator = self.actuators[id]
        return {
            'id': actuator.id,
            'type': actuator.type,
            'value': actuator.get()
        }

    def update_value(self, id, data):
        actuator = self.actuators[id]
        actuator.set(data['value'])
        return self.get_value(id)


actuators_service = ActuatorsService()
