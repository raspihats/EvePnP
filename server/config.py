

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Job files directory
JOBS_DIR = os.path.join(BASE_DIR, "jobs")

# Feeders file
FEEDERS_FILE = os.path.join(BASE_DIR, "feeders.json")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'dk_s*lpr&hwp!m&_#7wk@5m32^i%(=bth+=gv8j&c5+!iv=*ho'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Validation for api models
RESTPLUS_VALIDATE = True

# Machine config
MACHINE_CONFIG = {
    'axis': [
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
            'feed_rate': 100,
            'acc': 100,
            'park': 0
        },
        {
            'id': 'b',
            'limit': 360,
            'feed_rate': 100,
            'acc': 100,
            'park': 0
        }
    ],
    'actuators': [
        {'id': 'VacuumPump', 'type': 'toggle'},
        {'id': 'Valve1', 'type': 'toggle'},
        {'id': 'Valve2', 'type': 'toggle'}
    ],
    'heads': [
        {
            'id': 'H1',
            'nozzles': [
                {
                    'id': 'N1',
                    'rotation_axis_id': 'a',
                    'pnp_axis_id': 'z',
                    'vacuum_actuator_id': 'Valve1'
                },
                {
                    'id': 'N2',
                    'rotation_axis_id': 'b',
                    'pnp_axis': 'z',
                    'vacuum_actuator_id': 'Valve2'
                }
            ]
        }
    ]

}
