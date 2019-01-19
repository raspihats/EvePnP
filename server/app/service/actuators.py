from flask import current_app as app

_actuators = None


def _init():
    global _actuators

    _actuators = app.config['MACHINE_CONFIG']['actuators']
    # add 'value' key
    for actuator in _actuators:
        actuator['value'] = 0


def get_actuators_list():
    global _actuators

    if _actuators is None:
        _init()
    return _actuators


def get_actuator(id):
    for actuator in get_actuators_list():
        if actuator['id'] == id:
            return actuator
    return None


def update_actuator(id, data):
    actuator = get_actuator(id)
    if actuator is None:
        return None

    if data['value'] != actuator['value']:
        actuator['value'] = data['value']

    return actuator
