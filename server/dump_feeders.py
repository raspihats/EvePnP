from tinydb import TinyDB, Query
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
db = TinyDB("db_hardware.json", storage=CachingMiddleware(JSONStorage))


jobs_table = db.table('feeders')
print(jobs_table.all())

# make sure that all data is safely written when using Caching
db.close()
