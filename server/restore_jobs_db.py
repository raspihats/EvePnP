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
            "origin": {
                "x": 87.80,
                "y": 54.00,
                "z": 15
            },
            "rotation": 0,
            "operation": "place"
        },
        {
            "id": "Board_2",
            "origin": {
                "x": 172.80,
                "y": 54.00,
                "z": 15
            },
            "rotation": 0,
            "operation": "ignore"
        },
    ],
    "components": [
        {
            "id": "FID1",
            "offset": {
                "x": 10.64,
                "y": 2.22
            },
            "rotation": 0,
            "operation": "ignore",
            "value": "fiducial",
            "package": "FID1x3"
        },
        {
            "id": "FID2",
            "offset": {
                "x": 83.03,
                "y": 45.56
            },
            "rotation": 0,
            "operation": "ignore",
            "value": "fiducial",
            "package": "FID1x3"
        },
        {
            "operation": "place",
            "offset": {
                "x": 8.26,
                "y": 12.38
            },
            "value": "10nF 50V 10%",
            "rotation": 90,
            "package": "CAP-0603",
            "id": "C1"
        },
        {
            "operation": "place",
            "offset": {
                "x": 13.18,
                "y": 12.38
            },
            "value": "10nF 50V 10%",
            "rotation": 90,
            "package": "CAP-0603",
            "id": "C2"
        },
        {
            "operation": "place",
            "offset": {
                "x": 18.1,
                "y": 12.38
            },
            "value": "10nF 50V 10%",
            "rotation": 90,
            "package": "CAP-0603",
            "id": "C3",
        },
        {
            "operation": "place",
            "offset": {
                "x": 23.02,
                "y": 12.38
            },
            "value": "10nF 50V 10%",
            "rotation": 90,
            "package": "CAP-0603",
            "id": "C4",
        },
        {
            "operation": "place",
            "offset": {
                "x": 28.26,
                "y": 12.38
            },
            "value": "10nF 50V 10%",
            "rotation": 90,
            "package": "CAP-0603",
            "id": "C5",
        },
        {
            "operation": "place",
            "offset": {
                "x": 33.18,
                "y": 12.38
            },
            "value": "10nF 50V 10%",
            "rotation": 90,
            "package": "CAP-0603",
            "id": "C6",
        },
        {
            "operation": "place",
            "offset": {
                "x": 38.1,
                "y": 12.38
            },
            "value": "10nF 50V 10%",
            "rotation": 90,
            "package": "CAP-0603",
            "id": "C7",
        },
        {
            "operation": "place",
            "offset": {
                "x": 43.02,
                "y": 12.38
            },
            "value": "10nF 50V 10%",
            "rotation": 90,
            "package": "CAP-0603",
            "id": "C8",
        },
        {
            "operation": "place",
            "offset": {
                "x": 72.71,
                "y": 12.54
            },
            "value": "10nF 50V 10%",
            "rotation": 0,
            "package": "CAP-0603",
            "id": "C9"

        },
        {
            "operation": "place",
            "offset": {
                "x": 72.71,
                "y": 17.46
            },
            "value": "10nF 50V 10%",
            "rotation": 0,
            "package": "CAP-0603",
            "id": "C10"
        },
        {
            "operation": "place",
            "offset": {
                "x": 72.71,
                "y": 22.38
            },
            "value": "10nF 50V 10%",
            "rotation": 0,
            "package": "CAP-0603",
            "id": "C11"
        },
        {
            "operation": "place",
            "offset": {
                "x": 72.71,
                "y": 27.3
            },
            "value": "10nF 50V 10%",
            "rotation": 0,
            "package": "CAP-0603",
            "id": "C12"
        },
        {
            "operation": "place",
            "offset": {
                "x": 72.71,
                "y": 32.54
            },
            "value": "10nF 50V 10%",
            "rotation": 0,
            "package": "CAP-0603",
            "id": "C13"
        },
        {
            "operation": "place",
            "offset": {
                "x": 72.71,
                "y": 37.47
            },
            "value": "10nF 50V 10%",
            "rotation": 0,
            "package": "CAP-0603",
            "id": "C14"
        },
        {
            "operation": "place",
            "offset": {
                "x": 72.71,
                "y": 42.39
            },
            "value": "10nF 50V 10%",
            "rotation": 0,
            "package": "CAP-0603",
            "id": "C15"
        },
        {
            "operation": "place",
            "offset": {
                "x": 72.71,
                "y": 47.31
            },
            "value": "10nF 50V 10%",
            "rotation": 0,
            "package": "CAP-0603",
            "id": "C16"
        }
    ]
})

jobs_table.insert({
    "id": "Test1",
    "boards": [
        {
            "id": "Board_1",
            "origin": {
                "x": 84.16,
                "y": 50.0,
                "z": 20
            },
            "rotation": 0,
            "operation": "place"
        },
    ],
    "components": [
        {
            "id": "FID1",
            "offset": {
                "x": 10.64,
                "y": 2.22
            },
            "rotation": 0,
            "operation": "ignore",
            "value": "fiducial",
            "package": "FID1x3"
        },
        {
            "id": "FID2",
            "offset": {
                "x": 83.03,
                "y": 45.56
            },
            "rotation": 0,
            "operation": "ignore",
            "value": "fiducial",
            "package": "FID1x3"
        },
        {
            "id": "LD1",
            "operation": "place",
            "offset": {
                "x": 47.47,
                "y": 3.97
            },
            "rotation": 0,
            "value": "OSG50603C1E",
            "package": "LED-0603"
        },
        {
            "id": "LD2",
            "operation": "place",
            "offset": {
                "x": 48.97,
                "y": 3.97
            },
            "rotation": 0,
            "value": "OSG50603C1E",
            "package": "LED-0603"
        },
        {
            "id": "LD3",
            "operation": "place",
            "offset": {
                "x": 50.48,
                "y": 3.97
            },
            "rotation": 0,
            "value": "OSG50603C1E",
            "package": "LED-0603"
        },
        {

            "id": "LD4",
            "operation": "place",
            "offset": {
                "y": 3.97,
                "x": 51.99
            },
            "rotation": 0,
            "value": "OSG50603C1E",
            "package": "LED-0603"
        }
    ]
})

# make sure that all data is safely written when using Caching
db.close()
