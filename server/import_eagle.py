import sys
import os
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
            print(line.strip())
            d = dict_builder(fields, line.strip().replace(
                '   ', ' ').replace('  ', ' ').split(' '))
            x = d.pop('x')
            y = d.pop('y')
            d['offset'] = {'x': float(x), 'y': float(y)}
            d['operation'] = "place"
            if "fid" in d['package'] or "FID" in d['package']:
                d['operation'] = "ignore"

            rotation = float(d['rotation'])
            rotation += 90
            if(rotation >= 360):
                rotation -= 360
            d['rotation'] = 0 if ((rotation == 180) and
                                  ("RES" in d['package'] or "CAP" in d['package'])) else rotation
            components.append(d)

    # components.sort(key=lambda x: '{} {}'.format(x['package'], x['value']))

    # fiducials on first positions
    fiducials = [x for x in components if "fid" in x['value']
                 or "FID" in x['value'] or "fid" in d['package'] or "FID" in d['package']]

    for fiducial in fiducials:
        components.remove(fiducial)

    components = fiducials + components

    job = {
        "id": os.path.splitext(os.path.basename(file))[0],
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


if __name__ == "__main__":
    file_path = sys.argv[1]
    load(file_path)


# jobs_table = db.table('jobs')
# jobs_table.upsert()
