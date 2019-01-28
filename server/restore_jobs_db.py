from tinydb import TinyDB, Query
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
db = TinyDB("db_jobs.json", storage=CachingMiddleware(JSONStorage))

db.purge()

jobs_table = db.table('jobs')
jobs_table.purge()
jobs_table.insert({
    "id": "DI16ac-I2C-HAT-caps",
    "boards": [
        {
            "id": "Board_1",
            "x": 84.16,
            "y": 50.0,
            "angle": 0
        },
        {
            "id": "Board_2",
            "x": 170,
            "y": 50.0,
            "angle": 0
        },
    ],
    "components": [
        {
            "id": "FID1",
            "x": 10.64,
            "y": 2.22,
            "operation": "ignore",
            "value": "fiducial",
            "footprint": "FID1x3"
        },
        {
            "id": "FID2",
            "x": 83.03,
            "y": 45.56,
            "operation": "ignore",
            "value": "fiducial",
            "footprint": "FID1x3"
        },
        {
            "operation": "place",
            "x": 8.26,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C1",
            "y": 12.38
        },
        {
            "operation": "place",
            "x": 13.18,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C2",
            "y": 12.38
        },
        {
            "operation": "place",
            "x": 18.1,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C3",
            "y": 12.38
        },
        {
            "operation": "place",
            "x": 23.02,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C4",
            "y": 12.38
        },
        {
            "operation": "place",
            "x": 28.26,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C5",
            "y": 12.38
        },
        {
            "operation": "place",
            "x": 33.18,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C6",
            "y": 12.38
        },
        {
            "operation": "place",
            "x": 38.1,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C7",
            "y": 12.38
        },
        {
            "operation": "place",
            "x": 43.02,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C8",
            "y": 12.38
        },
        {
            "operation": "place",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C9",
            "y": 12.54
        },
        {
            "operation": "place",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C10",
            "y": 17.46
        },
        {
            "operation": "place",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C11",
            "y": 22.38
        },
        {
            "operation": "place",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C12",
            "y": 27.3
        },
        {
            "operation": "place",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C13",
            "y": 32.54
        },
        {
            "operation": "place",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C14",
            "y": 37.47
        },
        {
            "operation": "place",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C15",
            "y": 42.39
        },
        {
            "operation": "place",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C16",
            "y": 47.31
        }
    ]
})

jobs_table.insert({
    "id": "Test1",
    "boards": [
        {
            "id": "Board_1",
            "x": 84.16,
            "y": 50.0,
            "angle": 0
        },
    ],
    "components": [
        {
            "id": "FID1",
            "x": 10.64,
            "y": 2.22,
            "operation": "ignore",
            "value": "fiducial",
            "footprint": "FID1x3"
        },
        {
            "id": "FID2",
            "x": 83.03,
            "y": 45.56,
            "operation": "ignore",
            "value": "fiducial",
            "footprint": "FID1x3"
        },
        {
            "y": 3.97,
            "id": "LD1",
            "operation": "place",
            "x": 47.47,
            "angle": 0,
            "value": "OSG50603C1E",
            "package": "0603"
        },
        {
            "y": 3.97,
            "id": "LD2",
            "operation": "place",
            "x": 48.97,
            "angle": 0,
            "value": "OSG50603C1E",
            "package": "0603"
        },
        {
            "y": 3.97,
            "id": "LD3",
            "operation": "place",
            "x": 50.48,
            "angle": 0,
            "value": "OSG50603C1E",
            "package": "0603"
        },
        {
            "y": 3.97,
            "id": "LD4",
            "operation": "place",
            "x": 51.99,
            "angle": 0,
            "value": "OSG50603C1E",
            "package": "0603"
        }
    ]
})

# make sure that all data is safely written when using Caching
db.close()
