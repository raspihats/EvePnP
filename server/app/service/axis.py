from ..machine import machine


def home(axis_list):
    print("home: {}".format(axis_list))
    machine.home()


def jog(axis):
    print("jog: {}".format(axis))
    machine.jog(axis)


def park(axis_list):
    print("park: {}".format(axis_list))
    machine.park(axis_list)


def move(axis):
    print("move: {}".format(axis))


def get_current_position():
    pass
