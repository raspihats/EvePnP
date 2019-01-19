from flask import current_app as app


def get_actuators_list():
    return app.config['MACHINE_CONFIG']['actuators']


def get_actuator(id):
    for actuator in get_actuators_list():
        if actuator['id'] == id:
            return actuator
    return None
