from tinydb import TinyDB, Query
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
db = TinyDB("db_hardware.json", storage=CachingMiddleware(JSONStorage))

db.purge()

axis_table = db.table("axis")
axis_table.purge()
axis_table.insert_multiple([
    {
        "id": "x",
        "limit": 450,
        "feed_rate": 50000,
        "acc": 1500,
        "park": 5
    },
    {
        "id": "y",
        "limit": 400,
        "feed_rate": 50000,
        "acc": 1500,
        "park": 5
    },
    {
        "id": "z",
        "limit": 120,
        "feed_rate": 50000,
        "acc": 1500,
        "park": 59
    },
    {
        "id": "a",
        "limit": 360,
        "feed_rate": 50000,
        "acc": 1500,
        "park": 0
    },
    {
        "id": "b",
        "limit": 360,
        "feed_rate": 50000,
        "acc": 1500,
        "park": 0
    }
])

controllers_table = db.table("controllers")
controllers_table.purge()
controllers_table.insert_multiple([
    {
        "id": "Mc1",
        "driver": "grbl",
        "type": "motion",
        "port": {
                "name": "/dev/ttyAMA0",
                "baudrate": 115200,
                "bytesize": 8,
                "parity": "N",
                "stopbits": 1
        },
    },
    {
        "id": "Io1",
        "driver": "raspihats.i2c_hats.DQ10rly",
        "type": "input_output",
        "adr": 0x50
    }
])

actuators_table = db.table("actuators")
actuators_table.purge()
actuators_table.insert_multiple([
    {
        "id": "VacuumPump",
        "type": "ToggleActuator",
        "initial_value": 0,
        "code": """
def set(value):
    controllers['Mc1'].spindle_duty = value * 100

def get():
    return 1 if controllers['Mc1'].spindle_duty else 0
"""
    },
    {
        "id": "Valve1",
        "type": "ToggleActuator",
        "initial_value": 0,
        "code": """
def set(value):
    controllers['Mc1'].coolant_flood = value

def get():
    controllers['Mc1'].coolant_flood
"""
    },
    {
        "id": "Valve2",
        "type": "ToggleActuator",
        "initial_value": 0,
        "code": """
def set(value):
    controllers['Mc1'].coolant_mist = value

def get():
    controllers['Mc1'].coolant_mist
"""
    }
])


cameras_table = db.table("cameras")
cameras_table.purge()
cameras_table.insert_multiple([
    {
        "id": "Cam1",
        "description": "Up looking camera"
    },
    {
        "id": "Cam2",
        "description": "Down looking camera",
    }
])


phead_one_code = """
def move(point, speed_factor=1):
    feed_rate = 50000 * speed_factor
    axis_xy_config = controllers[motion_controller_xy_id].config['axis']
    axis_zr_config = controllers[motion_controller_zr_id].config['axis']

    # park pick n place axis before moving x or y
    if 'x' in point or 'y' in point:
        controllers[motion_controller_zr_id].move({ 
            z_axis_id: axis_zr_config[z_axis_id]['park']
        }, feed_rate)

    # move x,y
    position = {}
    if 'x' in point:
        position[x_axis_id] = point['x'] + offset['x']
    if 'y' in point:
        position[y_axis_id] = point['y'] + offset['y']
    
    controllers[motion_controller_xy_id].move(position, feed_rate)

    # raise/descent and rotate nozzle
    position = {}
    if 'z' in point:
        position[z_axis_id] = point['z']
    if 'r' in point:
        position[r_axis_id] = point['r']
    controllers[motion_controller_zr_id].move(position, feed_rate)

def get_position():
    return {
        'x' : 100,
        'y' : 101,
        'z' : 102,
        'r' : 104
    }

def jog(axis, step, speed_factor=1):
    feed_rate = 50000 * speed_factor

    axis_map = {
        'x' : x_axis_id,
        'y' : y_axis_id,
        'z' : z_axis_id,
        'r' : r_axis_id
    }

    if axis == 'x' or axis == 'y':
        controllers[motion_controller_xy_id].jog(axis_map[axis], step, feed_rate)
    if axis == 'z' or axis == 'r':
        controllers[motion_controller_zr_id].jog(axis_map[axis], step, feed_rate)


def park(axis_list, speed_factor=1):
    feed_rate = 50000 * speed_factor
    axis_xy_config = controllers[motion_controller_xy_id].config['axis']
    axis_zr_config = controllers[motion_controller_zr_id].config['axis']

    # park z and r axis
    park_position = {}
    # park z even if x, y parking is desired
    if 'x' in axis_list or 'y' in axis_list or 'z' in axis_list:
        park_position[z_axis_id] = axis_zr_config[z_axis_id]['park']
    if 'r' in axis_list:
        park_position[r_axis_id] = axis_zr_config[r_axis_id]['park']

    if park_position:
        controllers[motion_controller_zr_id].move(park_position, feed_rate)

    # park x and y axis
    park_position = {}
    if 'x' in axis_list:
        park_position[x_axis_id] = axis_xy_config[x_axis_id]['park']
    if 'y' in axis_list:
        park_position[y_axis_id] = axis_xy_config[y_axis_id]['park']
    
    if park_position:
         controllers[motion_controller_xy_id].move(park_position, feed_rate)


def pick(point):
    feed_rate = 50000
    x_position = point.pop('x')
    y_position = point.pop('y')
    z_position = point.pop('z')

    # park pick n place axis
    controllers['Mc1'].move(
        {
            pnp_axis_id: axis[pnp_axis_id].park
        }, feed_rate)

    # move to pick point
    controllers['Mc1'].move({
        'x': x_position, 
        'y': y_position,
        rotation_axis_id: 0
    }, feed_rate)

    # descent nozzle
    controllers['Mc1'].move({pnp_axis_id: z_position}, feed_rate)

    # enable vacuum
    actuators[vacuum_actuator_id].set(True)

    # raise nozzle
    controllers['Mc1'].move({pnp_axis_id: axis[pnp_axis_id].park}, feed_rate)


def place(point, rotation, package):
    feed_rate = 50000
    x_position = point.pop('x')
    y_position = point.pop('y')
    z_position = point.pop('z') + package.height

    # move to pick point and rotate
    controllers['Mc1'].move(
        {
            'x': x_position,
            'y': y_position,
            rotation_axis_id: rotation
        }, feed_rate)

    # descent nozzle
    controllers['Mc1'].move({pnp_axis_id: z_position}, feed_rate)

    # disable vacuum
    actuators[vacuum_actuator_id].set(False)

    # raise nozzle
    controllers['Mc1'].move({pnp_axis_id: axis[pnp_axis_id].park}, feed_rate)
"""

phead_two_code = """
def move(point, speed_factor=1):
    feed_rate = 50000 * speed_factor
    axis_xy_config = controllers[motion_controller_xy_id].config['axis']
    axis_zr_config = controllers[motion_controller_zr_id].config['axis']

    # park pick n place axis before moving x or y
    if 'x' in point or 'y' in point:
        controllers[motion_controller_zr_id].move({ 
            z_axis_id: axis_zr_config[z_axis_id]['park']
        }, feed_rate)

    # move x,y
    position = {}
    if 'x' in point:
        position[x_axis_id] = point['x'] + offset['x']
    if 'y' in point:
        position[y_axis_id] = point['y'] + offset['y']
    
    controllers[motion_controller_xy_id].move(position, feed_rate)

    # raise/descent and rotate nozzle
    position = {}
    if 'z' in point:
        position[z_axis_id] = point['z']
    if 'r' in point:
        position[r_axis_id] = point['r']
    controllers[motion_controller_zr_id].move(position, feed_rate)

def get_position():
    return {
        'x' : 200,
        'y' : 201,
        'z' : 202,
        'r' : 204
    }

def jog(axis, step, speed_factor=1):
    feed_rate = 50000 * speed_factor

    axis_map = {
        'x' : x_axis_id,
        'y' : y_axis_id,
        'z' : z_axis_id,
        'r' : r_axis_id
    }

    if axis == 'z':
        step = -step

    if axis == 'x' or axis == 'y':
        controllers[motion_controller_xy_id].jog(axis_map[axis], step, feed_rate)
    if axis == 'z' or axis == 'r':
        controllers[motion_controller_zr_id].jog(axis_map[axis], step, feed_rate)

def park(axis_list, speed_factor=1):
    feed_rate = 50000 * speed_factor
    axis_xy_config = controllers[motion_controller_xy_id].config['axis']
    axis_zr_config = controllers[motion_controller_zr_id].config['axis']

    # park z and r axis
    park_position = {}
    # park z even if x, y parking is desired
    if 'x' in axis_list or 'y' in axis_list or 'z' in axis_list:
        park_position[z_axis_id] = axis_zr_config[z_axis_id]['park']
    if 'r' in axis_list:
        park_position[r_axis_id] = axis_zr_config[r_axis_id]['park']

    if park_position:
        controllers[motion_controller_zr_id].move(park_position, feed_rate)

    # park x and y axis
    park_position = {}
    if 'x' in axis_list:
        park_position[x_axis_id] = axis_xy_config[x_axis_id]['park']
    if 'y' in axis_list:
        park_position[y_axis_id] = axis_xy_config[y_axis_id]['park']
    
    if park_position:
         controllers[motion_controller_xy_id].move(park_position, feed_rate)
         

def pick(point):
    feed_rate = 50000
    x_position = point.pop('x')
    y_position = point.pop('y')
    z_position = 118 - point.pop('z')

    # park pick n place axis
    controllers['Mc1'].move(
        {
            pnp_axis_id: axis[pnp_axis_id].park
        }, feed_rate)

    # move to pick point
    controllers['Mc1'].move(
        {
            'x': x_position,
            'y': y_position,
            rotation_axis_id: 0
        }, feed_rate)

    # descent nozzle
    controllers['Mc1'].move({pnp_axis_id: z_position}, feed_rate)

    # enable vacuum
    actuators[vacuum_actuator_id].set(True)

    # raise nozzle
    controllers['Mc1'].move({pnp_axis_id: axis[pnp_axis_id].park}, feed_rate)


def place(point, rotation, package):
    feed_rate = 50000
    x_position = point.pop('x')
    y_position = point.pop('y')
    z_position = 118 - (point.pop('z') + package.height)

    # move to pick point and rotate
    controllers['Mc1'].move(
        {
            'x': x_position,
            'y': y_position,
            rotation_axis_id: rotation
        }, feed_rate)

    # descent nozzle
    controllers['Mc1'].move({pnp_axis_id: z_position}, feed_rate)

    # disable vacuum
    actuators[vacuum_actuator_id].set(False)

    # raise nozzle
    controllers['Mc1'].move({pnp_axis_id: axis[pnp_axis_id].park}, feed_rate)
"""

head_table = db.table("head")
head_table.purge()
head_table.insert(
    {
        "placement_heads": [
            {
                "id": "PlaceHead1",
                "x_axis_id": "x",
                "y_axis_id": "y",
                "motion_controller_xy_id": "Mc1",  # for x/y movement
                "z_axis_id": "z",
                "r_axis_id": "a",
                "motion_controller_zr_id": "Mc1",  # for z/rot movement
                "offset": {"x": 0.0, "y": 0.0},
                "vacuum_actuator_id": "Valve1",
                "code": phead_one_code
            },
            {
                "id": "PlaceHead2",
                "x_axis_id": "x",
                "y_axis_id": "y",
                "motion_controller_xy_id": "Mc1",  # for x/y movement
                "z_axis_id": "z",
                "r_axis_id": "b",
                "motion_controller_zr_id": "Mc1",  # for z/rot movement
                "offset": {"x": -43.8, "y": 0.0},
                "vacuum_actuator_id": "Valve2",
                "code": phead_two_code
            }
        ],
        "cameras": [
            {
                "id": "Cam2",
                "offset": {"x": -21.9, "y": -20.0}
            }
        ]
    }

)

# /api/heads/Head1/p_heads/PlaceHead1/position
# /api/p_heads/PlaceHead1/position

# heads_table = db.table("heads")
# heads_table.purge()
# heads_table.insert_multiple([
#     {
#         "id": "Head1",
#         "motion_controller_id": "Mc1",          # for x/y movement
#         "x_axis_id": "x",
#         "y_axis_id": "y",
#         "placement_heads": [
#             {
#                 "id": "PlaceHead1",
#                 "offset": {"x": 0.0, "y": 0.0},
#                 "motion_controller_id": "Mc1",  # for z/rot movement
#                 "pnp_axis_id": "z",
#                 "rotation_axis_id": "a",
#                 "vacuum_actuator_id": "Valve1",
#                 "code": phead_one_code
#             },
#             {
#                 "id": "PlaceHead2",
#                 "offset": {"x": -43.8, "y": 0.0},
#                 "motion_controller_id": "Mc1",  # for z/rot movement
#                 "pnp_axis_id": "z",
#                 "rotation_axis_id": "b",
#                 "vacuum_actuator_id": "Valve2",
#                 "code": phead_two_code
#             }
#         ],
#         "cameras": [
#             {
#                 "id": "Cam2",
#                 "offset": {"x": -21.9, "y": -20.0}
#             }
#         ]
#     }
# ])


feeders_code_xn = """# get_point gets called before pick operation 
# and should return the next pick point
def get_point(point, count, size):
    point['x'] -= (size-count) * 3.98
    return point"""

feeders_code_xp = """# get_point gets called before pick operation 
# and should return the next pick point
def get_point(point, count, size):
    point['x'] += (size-count) * 3.98
    return point"""

feeders_table = db.table("feeders")
feeders_table.purge()
feeders_table.insert_multiple([
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_1",
        "size": 47,
        "component": {
            "value": "5.6K 1%",
            "package": "RES-1206"
        },
        "point": {"x": 225.6, "y": 130.5, "z": 31},
        "code": feeders_code_xn
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_2",
        "size": 47,
        "component": {
            "value": "10nF 50V 10%",
            "package": "CAP-0603"
        },
        "point": {"x": 225.6, "y": 142.5, "z": 31},
        "code": feeders_code_xn
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_3",
        "size": 47,
        "component": {
            "value": "24K 1%",
            "package": "RES-0603"
        },
        "point": {"x": 225.6, "y": 154.5, "z": 31},
        "code": feeders_code_xn
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_4",
        "size": 47,
        "component": {
            "value": "18K 1%",
            "package": "RES-0603"
        },
        "point": {"x": 225.6, "y": 166.6, "z": 31},
        "code": feeders_code_xn
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_5",
        "size": 47,
        "component": {
            "value": "47K 1%",
            "package": "RES-0603"
        },
        "point": {"x": 225.6, "y": 178.7, "z": 31},
        "code": feeders_code_xn
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_6",
        "size": 47,
        "component": {
            "value": "12pF 50V 5%",
            "package": "CAP-0603"
        },
        "point": {"x": 225.6, "y": 190.7, "z": 31},
        "code": feeders_code_xn
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_7",
        "size": 47,
        "component": {
            "value": "1uF 50V 5%",
            "package": "CAP-0603"
        },
        "point": {"x": 225.6, "y": 202.8, "z": 31},
        "code": feeders_code_xn
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_8",
        "size": 47,
        "component": {
            "value": "100nF 10V 5%",
            "package": "CAP-0603"
        },
        "point": {"x": 225.6, "y": 214.8, "z": 31},
        "code": feeders_code_xn
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_9",
        "size": 47,
        "component": {"value": "BSS84", "package": "SOT-23"},
        "point": {"x": 252, "y": 133.2, "z": 31},
        "code": feeders_code_xp
    },
    {
        "count": 23,
        "type": "StripFeeder",
        "id": "StripFeeder_10",
        "size": 23,
        "component": {
            "value": "680R 5%",
            "package": "RES-0603"
        },
        "point": {"x": 347.4, "y": 146, "z": 31},
        "code": feeders_code_xp
    },
    {
        "count": 23,
        "type": "StripFeeder",
        "id": "StripFeeder_11",
        "size": 23,
        "component": {
            "value": "10K 1%",
            "package": "RES-0603"
        },
        "point": {"x": 347.5, "y": 158, "z": 31},
        "code": feeders_code_xp
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_12",
        "size": 47,
        "component": {"value": "OSG50603C1E", "package": "LED-0603"},
        "point": {"x": 251.8, "y": 169.4, "z": 31},
        "code": feeders_code_xp
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_13",
        "size": 47,
        "component": {
            "value": "PDTC114ET",
            "package": "SOT-23",
        },
        "point": {"x": 251.8, "y": 181.4, "z": 31},
        "code": feeders_code_xp
    },
    {
        "count": 23,
        "type": "StripFeeder",
        "id": "StripFeeder_14",
        "size": 23,
        "component": {
            "value": "0R 1%",
            "package": "RES-0603"
        },
        "point": {"x": 347.3, "y": 194, "z": 31},
        "code": feeders_code_xp
    },
    {
        "count": 23,
        "type": "StripFeeder",
        "id": "StripFeeder_15",
        "size": 23,
        "component": {
            "value": "150R 5%",
            "package": "RES-0603"
        },
        "point": {"x": 347.3, "y": 206, "z": 31},
        "code": feeders_code_xp
    },
    {
        "count": 47,
        "type": "StripFeeder",
        "id": "StripFeeder_16",
        "size": 47,
        "component": {
            "value": "LL4148",
            "package": "SOD-80"
        },
        "point": {"x": 251.6, "y": 217.4, "z": 31},
        "code": feeders_code_xp
    }
])


packages_table = db.table("packages")
packages_table.purge()

# fiducials
packages_table.insert_multiple([
    {
        "id": "FID-1x3",
        "length": 3.00,
        "width": 3.00,
        "height": 0.01
    }
])

# resistors
packages_table.insert_multiple([
    {
        "id": "RES-0201",
        "length": 0.60,
        "width": 0.30,
        "height": 0.25
    },
    {
        "id": "RES-0402",
        "length": 1.00,
        "width": 0.50,
        "height": 0.35
    },
    {
        "id": "RES-0603",
        "length": 1.55,
        "width": 0.85,
        "height": 0.45
    },
    {
        "id": "RES-0805",
        "length": 2.00,
        "width": 1.20,
        "height": 0.45
    },
    {
        "id": "RES-1206",
        "length": 3.20,
        "width": 1.60,
        "height": 0.55
    },
    {
        "id": "RES-1210",
        "length": 3.20,
        "width": 2.20,
        "height": 0.55
    },
    {
        "id": "RES-1218",
        "length": 3.20,
        "width": 4.60,
        "height": 0.55
    },
    {
        "id": "RES-2010",
        "length": 5.00,
        "width": 2.50,
        "height": 0.60
    },
    {
        "id": "RES-2512",
        "length": 6.30,
        "width": 3.20,
        "height": 0.60
    }
])

# capacitors
packages_table.insert_multiple([
    {
        "id": "CAP-0201",
        "length": 0.60,
        "width": 0.30,
        "height": 0.50
    },
    {
        "id": "CAP-0402",
        "length": 1.00,
        "width": 0.50,
        "height": 0.50
    },
    {
        "id": "CAP-0603",
        "length": 1.55,
        "width": 0.85,
        "height": 1.00
    },
    {
        "id": "CAP-0805",
        "length": 2.00,
        "width": 1.20,
        "height": 1.00
    },
    {
        "id": "CAP-1206",
        "length": 3.20,
        "width": 1.60,
        "height": 1.00
    },
    {
        "id": "CAP-1210",
        "length": 3.20,
        "width": 2.20,
        "height": 1.00
    }
])

# leds
packages_table.insert_multiple([
    {
        "id": "LED-0603",
        "length": 1.55,
        "width": 0.85,
        "height": 1.00
    }
])

# diodes, transistors
packages_table.insert_multiple([
    {
        "id": "SOD-80",
        "length": 3.70,
        "width": 1.7,
        "height": 1.7
    },
    {
        "id": "SOT-23",
        "length": 3.10,
        "width": 2.60,
        "height": 1.20
    },
    {
        "id": "SOT-23-5",
        "length": 3.10,
        "width": 2.60,
        "height": 1.20
    },
    {
        "id": "SOT-23-6",
        "length": 3.10,
        "width": 2.60,
        "height": 1.20
    }

])


# make sure that all data is safely written when using Caching
db.close()
