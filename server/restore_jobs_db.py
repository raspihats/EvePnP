from tinydb import TinyDB, Query
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
db = TinyDB("db_jobs.json", storage=CachingMiddleware(JSONStorage))

db.purge()

jobs_table = db.table('jobs')
jobs_table.purge()
jobs_table.insert({
    "id": "DI16ac-I2C-HAT-caps",
    "components": [
        {
          "type": "origin",
          "x": 84.16,
          "value": "origin",
          "angle": 0,
          "package": "origin",
          "id": "ORIGIN",
          "y": 50.0
        },
        {
            "type": "fiducial",
            "x": 10.64,
            "value": "FIDUCIAL1X3",
            "angle": 0,
            "package": "FIDUCIAL-1X3",
            "id": "FID1",
            "y": 2.22
        },
        {
            "type": "fiducial",
            "x": 83.03,
            "value": "FIDUCIAL1X3",
            "angle": 0,
            "package": "FIDUCIAL-1X3",
            "id": "FID2",
            "y": 45.56
        },
        {
            "type": "component",
            "x": 8.26,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C1",
            "y": 12.38
        },
        {
            "type": "component",
            "x": 13.18,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C2",
            "y": 12.38
        },
        {
            "type": "component",
            "x": 18.1,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C3",
            "y": 12.38
        },
        {
            "type": "component",
            "x": 23.02,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C4",
            "y": 12.38
        },
        {
            "type": "component",
            "x": 28.26,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C5",
            "y": 12.38
        },
        {
            "type": "component",
            "x": 33.18,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C6",
            "y": 12.38
        },
        {
            "type": "component",
            "x": 38.1,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C7",
            "y": 12.38
        },
        {
            "type": "component",
            "x": 43.02,
            "value": "10nF",
            "angle": 90,
            "package": "CAP-0603",
            "id": "C8",
            "y": 12.38
        },
        {
            "type": "component",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C9",
            "y": 12.54
        },
        {
            "type": "component",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C10",
            "y": 17.46
        },
        {
            "type": "component",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C11",
            "y": 22.38
        },
        {
            "type": "component",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C12",
            "y": 27.3
        },
        {
            "type": "component",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C13",
            "y": 32.54
        },
        {
            "type": "component",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C14",
            "y": 37.47
        },
        {
            "type": "component",
            "x": 72.71,
            "value": "10nF",
            "angle": 0,
            "package": "CAP-0603",
            "id": "C15",
            "y": 42.39
        },
        {
            "type": "component",
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
    "components": [
        {
          "y": 23.5,
          "id": "Origin",
          "type": "origin",
          "x": 95.8,
          "angle": 0,
          "value": "",
          "package": ""
        },
        {
            "y": 3.97,
            "id": "LD1",
            "type": "component",
            "x": 47.47,
            "angle": 0,
            "value": "OSG50603C1E",
            "package": "0603"
        },
        {
            "y": 3.97,
            "id": "LD2",
            "type": "component",
            "x": 48.97,
            "angle": 0,
            "value": "OSG50603C1E",
            "package": "0603"
        },
        {
            "y": 3.97,
            "id": "LD3",
            "type": "component",
            "x": 50.48,
            "angle": 0,
            "value": "OSG50603C1E",
            "package": "0603"
        },
        {
            "y": 3.97,
            "id": "LD4",
            "type": "component",
            "x": 51.99,
            "angle": 0,
            "value": "OSG50603C1E",
            "package": "0603"
        },
        {
            "y": 100,
            "id": "FID1",
            "type": "fiducial",
            "x": 100,
            "angle": 0,
            "value": "",
            "package": ""
        },
        {
            "y": 200,
            "id": "FID2",
            "type": "fiducial",
            "x": 200,
            "angle": 0,
            "value": "",
            "package": ""
        }
    ]
})

# make sure that all data is safely written when using Caching
db.close()
