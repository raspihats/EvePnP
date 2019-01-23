from tinydb import TinyDB, Query
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
db = TinyDB('hardware_config.json', storage=CachingMiddleware(JSONStorage))

db.purge()

axis_table = db.table('axis')
axis_table.purge()
axis_table.insert_multiple([
    {
        'id': 'x',
        'limit': 450,
        'feed_rate': 25000,
        'acc': 600,
        'park': 5
    },
    {
        'id': 'y',
        'limit': 400,
        'feed_rate': 25000,
        'acc': 600,
        'park': 5
    },
    {
        'id': 'z',
        'limit': 120,
        'feed_rate': 25000,
        'acc': 600,
        'park': 59
    },
    {
        'id': 'a',
        'limit': 360,
        'feed_rate': 50000,
        'acc': 1000,
        'park': 0
    },
    {
        'id': 'b',
        'limit': 360,
        'feed_rate': 50000,
        'acc': 1000,
        'park': 0
    }
])

actuators_table = db.table('actuators')
actuators_table.purge()
actuators_table.insert_multiple([
    {'id': 'VacuumPump', 'type': 'toggle_actuator'},
    {'id': 'Valve1', 'type': 'toggle_actuator'},
    {'id': 'Valve2', 'type': 'toggle_actuator'}
])


nozzles_table = db.table('nozzles')
nozzles_table.purge()
nozzles_table.insert_multiple([
    {
        'id': 'N1',
        'head_id': 'H1',
        'rotation_axis_id': 'a',
        'pnp_axis_id': 'z',
        'vacuum_actuator_id': 'Valve1'
    },
    {
        'id': 'N2',
        'head_id': 'H1',
        'rotation_axis_id': 'b',
        'pnp_axis_id': 'z',
        'vacuum_actuator_id': 'Valve2'
    }
])


controllers_table = db.table('controllers')
controllers_table.purge()
controllers_table.insert_multiple([
    {
        'id': 'MC1',
        'driver': 'grbl',
        'type': 'motion',
        'port': {
                'id': '/dev/ttyAMA0',
                'baudrate': 115200,
                'bytesize': 8,
                'parity': 'N',
                'stopbits': 1
        },
    },
    {
        'id': 'IO1',
        'driver': 'raspihats.i2c_hats.DQ10rly',
        'type': 'input_output',
        'adr': 0x50
    }
])

feeders_table = db.table('feeders')
feeders_table.purge()
feeders_table.insert_multiple([
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_1',
        'size': 48,
        'component': {
            'value': '5.6K',
            'package': '1206',
            'type': 'resistor',
            'tolerance': '1%'
        },
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 136.5, 'x': 39.0, 'z': 23},
        'id': 'StripFeeder_2',
        'size': 48,
        'component': {
            'value': '10nF',
            'voltage': '50V',
            'package': '0603',
            'type': 'capacitor',
            'tolerance': '10%'
        },
        'point': {'y': 136.5, 'x': 39.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_3',
        'size': 48,
        'component': {
            'value': '24K',
            'package': '0603',
            'type': 'resistor',
            'tolerance': '1%'
        },
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_4',
        'size': 48,
        'component': {
            'value': '18K',
            'package': '0603',
            'type': 'resistor',
            'tolerance': '1%'
        },
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_5',
        'size': 48,
        'component': {
            'value': '47K',
            'package': '0603',
            'type': 'resistor',
            'tolerance': '1%'
        },
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 136.5, 'x': 39.0, 'z': 23},
        'id': 'StripFeeder_6',
        'size': 48,
        'component': {
            'value': '12pF',
            'voltage': '50V',
            'package': '0603',
            'type': 'capacitor',
            'tolerance': '5%'
        },
        'point': {'y': 136.5, 'x': 39.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 136.5, 'x': 39.0, 'z': 23},
        'id': 'StripFeeder_7',
        'size': 48,
        'component': {
            'value': '1uF',
            'voltage': '50V',
            'package': '0603',
            'type': 'capacitor',
            'tolerance': '5%'
        },
        'point': {'y': 136.5, 'x': 39.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 136.5, 'x': 39.0, 'z': 23},
        'id': 'StripFeeder_8',
        'size': 48,
        'component': {
            'value': '100nF',
            'voltage': '10V',
            'package': '0603',
            'type': 'capacitor',
            'tolerance': '5%'
        },
        'point': {'y': 136.5, 'x': 39.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 136.5, 'x': 39.0, 'z': 23},
        'id': 'StripFeeder_9',
        'size': 48,
        'component': {'value': 'BSS84', 'package': 'SOT23', 'type': 'nmos'},
        'point': {'y': 136.5, 'x': 39.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_10',
        'size': 48,
        'component': {
            'value': '680R',
            'package': '0603',
            'type': 'resistor',
            'tolerance': '5%'
        },
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_11',
        'size': 48,
        'component': {
            'value': '10K',
            'package': '0603',
            'type': 'resistor',
            'tolerance': '1%'
        },
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_12',
        'size': 48,
        'component': {'value': 'OSG050603', 'package': '0603', 'type': 'led'},
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_13',
        'size': 48,
        'component': {
            'value': 'PDTC114ET',
            'package': 'SOT23',
            'type': 'transistor'
        },
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_14',
        'size': 48,
        'component': {
            'value': '0R',
            'package': '0603',
            'type': 'resistor',
            'tolerance': '1%'
        },
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_15',
        'size': 48,
        'component': {
            'value': '150R',
            'package': '0603',
            'type': 'resistor',
            'tolerance': '5%'
        },
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    },
    {
        'count': 48,
        'type': 'strip_feeder',
        'end_point': {'y': 141.6, 'x': 37.925, 'z': 23},
        'id': 'StripFeeder_16',
        'size': 48,
        'component': {
            'value': 'LL4148',
            'package': 'SOD80',
            'type': 'diode',
            'tolerance': '5%'
        },
        'point': {'y': 139.4, 'x': 225.0, 'z': 23}
    }
])

# make sure that all data is safely written when using Caching
db.close()