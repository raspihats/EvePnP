from ..dao import axis_dao
from .controllers import controllers_service
from .actuators import actuators_service


class DictObject(object):
    def __init__(self, config):
        self._config = dict(config)

    def __getattr__(self, attribute):
        return self._config[attribute]


def run_func(target, name, *args, **kwargs):
    axis = {}
    for axis_config in axis_dao.get_list():
        axis[axis_config['id']] = DictObject(axis_config)

    _globals = dict(target)
    _globals['controllers'] = controllers_service.controllers
    _globals['actuators'] = actuators_service.actuators
    _globals['axis'] = axis

    _locals = {}
    exec(target['code'], _globals, _locals)
    func = _locals[name]
    return func(*args, **kwargs)
