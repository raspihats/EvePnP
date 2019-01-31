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
        "feed_rate": 25000,
        "acc": 600,
        "park": 5
    },
    {
        "id": "y",
        "limit": 400,
        "feed_rate": 25000,
        "acc": 600,
        "park": 5
    },
    {
        "id": "z",
        "limit": 120,
        "feed_rate": 25000,
        "acc": 600,
        "park": 59
    },
    {
        "id": "a",
        "limit": 360,
        "feed_rate": 50000,
        "acc": 1000,
        "park": 0
    },
    {
        "id": "b",
        "limit": 360,
        "feed_rate": 50000,
        "acc": 1000,
        "park": 0
    }
])

actuators_table = db.table("actuators")
actuators_table.purge()
actuators_table.insert_multiple([
    {
        "id": "VacuumPump",
        "type": "ToggleActuator",
        "inital_value": 0,
        "set_code": "controllers['MC1'].spindle_duty = value * 100",
        "get_code": "result = 1 if controllers['MC1'].spindle_duty else 0"
    },
    {
        "id": "Valve1",
        "type": "ToggleActuator",
        "inital_value": 0,
        "set_code": "controllers['MC1'].coolant_flood = value",
        "get_code": "result = controllers['MC1'].coolant_flood"
    },
    {
        "id": "Valve2",
        "type": "ToggleActuator",
        "inital_value": 0,
        "set_code": "controllers['MC1'].coolant_mist = value",
        "get_code": "result = controllers['MC1'].coolant_mist"
    }
])


nozzle_carriages_table = db.table("nozzle_carriages")
nozzle_carriages_table.purge()
nozzle_carriages_table.insert_multiple([
    {
        "id": "NC1",
        "rotation_axis_id": "a",
        "pnp_axis_id": "z",
        "vacuum_actuator_id": "Valve1"
    },
    {
        "id": "NC2",
        "rotation_axis_id": "b",
        "pnp_axis_id": "z",
        "vacuum_actuator_id": "Valve2"

    }
])

cameras_table = db.table("cameras")
cameras_table.purge()
cameras_table.insert_multiple([
    {
        "id": "C1",
        "description": "Up looking camera"
    },
    {
        "id": "C2",
        "description": "Down looking camera",
    }
])

heads_table = db.table("heads")
heads_table.purge()
heads_table.insert_multiple([
    {
        "id": "H1",
        "nozzle_carriages": [
            {
                "id": "NC1",
                "offset": {"x": 0.0, "y": 0.0}
            },
            {
                "id": "NC2",
                "offset": {"x": 45.0, "y": 0.0}
            }
        ],
        "cameras": [
            {
                "id": "C2",
                "offset": {"x": 22.5, "y": -20.0}
            }
        ]
    }
])


controllers_table = db.table("controllers")
controllers_table.purge()
controllers_table.insert_multiple([
    {
        "id": "MC1",
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
        "id": "IO1",
        "driver": "raspihats.i2c_hats.DQ10rly",
        "type": "input_output",
        "adr": 0x50
    }
])

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
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_1",
        "size": 48,
        "component": {
            "value": "5.6K 1%",
            "package": "RES-1206"
        },
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xn
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_2",
        "size": 48,
        "component": {
            "value": "10nF 50V 10%",
            "package": "CAP-0603"
        },
        "point": {"x": 225.7, "y": 142.1, "z": 30},
        "code": feeders_code_xn
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_3",
        "size": 48,
        "component": {
            "value": "24K 1%",
            "package": "RES-0603"
        },
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xn
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_4",
        "size": 48,
        "component": {
            "value": "18K 1%",
            "package": "RES-0603"
        },
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xn
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_5",
        "size": 48,
        "component": {
            "value": "47K 1%",
            "package": "RES-0603"
        },
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xn
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_6",
        "size": 48,
        "component": {
            "value": "12pF 50V 5%",
            "package": "CAP-0603"
        },
        "point": {"y": 136.5, "x": 39.0, "z": 23},
        "code": feeders_code_xn
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_7",
        "size": 48,
        "component": {
            "value": "1uF 50V 5%",
            "package": "CAP-0603"
        },
        "point": {"y": 136.5, "x": 39.0, "z": 23},
        "code": feeders_code_xn
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_8",
        "size": 48,
        "component": {
            "value": "100nF 10V 5%",
            "package": "CAP-0603"
        },
        "point": {"y": 136.5, "x": 39.0, "z": 23},
        "code": feeders_code_xn
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_9",
        "size": 48,
        "component": {"value": "BSS84", "package": "SOT-23"},
        "point": {"y": 136.5, "x": 39.0, "z": 23},
        "code": feeders_code_xp
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_10",
        "size": 48,
        "component": {
            "value": "680R 5%",
            "package": "RES-0603"
        },
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xp
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_11",
        "size": 48,
        "component": {
            "value": "10K 1%",
            "package": "RES-0603"
        },
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xp
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_12",
        "size": 48,
        "component": {"value": "OSG050603", "package": "LED-0603"},
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xp
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_13",
        "size": 48,
        "component": {
            "value": "PDTC114ET",
            "package": "SOT-23",
        },
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xp
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_14",
        "size": 48,
        "component": {
            "value": "0R 1%",
            "package": "RES-0603"
        },
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xp
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_15",
        "size": 48,
        "component": {
            "value": "150R 5%",
            "package": "RES-0603"
        },
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xp
    },
    {
        "count": 48,
        "type": "StripFeeder",
        "id": "StripFeeder_16",
        "size": 48,
        "component": {
            "value": "LL4148",
            "package": "SOD-80"
        },
        "point": {"x": 225.9, "y": 130, "z": 30},
        "code": feeders_code_xp
    }
])


packages_table = db.table("packages")
packages_table.purge()
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

])


# make sure that all data is safely written when using Caching
db.close()
