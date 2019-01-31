from tinydb import TinyDB, Query
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
db = TinyDB("db_jobs.json", storage=CachingMiddleware(JSONStorage))


def dict_builder(keys, values):
    d = {}
    for i in range(0, len(keys)):
        d[keys[i]] = values[i]
    return d


def load(file):
    components = []
    with open(file) as f:
        fields = ['id', 'x', 'y', 'rotation', 'value', 'package']
        for line in f:
            d = dict_builder(fields, line.strip().split(','))
            x = d.pop('x')
            y = d.pop('y')
            d['offset'] = {'x': float(x), 'y': float(y)}
            d['operation'] = "place" if (
                "RES" in d['package'] or "CAP" in d['package']) else "ignore"
            rotation = float(d['rotation'])
            rotation += 90
            d['rotation'] = 0 if ((rotation == 180) and
                                  ("RES" in d['package'] or "CAP" in d['package'])) else rotation
            components.append(d)
    # print(components)

    job = {
        "id": file,
        "boards": [
            {
                "id": "Board_1",
                "origin": {
                    "x": 87.80,
                    "y": 54.00,
                    "z": 15
                },
                "rotation": 0,
                "operation": "place"
            }
        ],
        "components": components
    }

    jobs_table = db.table('jobs')
    jobs_table.upsert(job, Query()['id'] == file)

    # make sure that all data is safely written when using Caching
    db.close()


load("DI16ac-I2C-HAT.mnt")


# jobs_table = db.table('jobs')
# jobs_table.upsert()
