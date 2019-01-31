from tinydb import TinyDB, Query, where
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
db = TinyDB("db_hardware.json", storage=CachingMiddleware(JSONStorage))


feeders_table = db.table("feeders")

# q = Query()
# result = feeders_table.search(q.component.package == 'CAP-0603')
# result = feeders_table.search(q['component']['package'] == 'CAP-0603')
# d = {'component': {'package': 'CAP-0603', 'value': '10nF 50V 10%'}}
# q = (Query()['component']['package'] == d['component']['package'])
# q &= (Query()['component']['value'] == d['component']['value'])

q_params = {'component': {'package': 'CAP-0603', 'value': '10nF 50V 10%'}}

q = Query()

# for key in q_params:
#     if type(q_params[key]) is dict:

#     else:
#         q.append[key]
#         # q[key] == q_params[key]


q = (Query()['component']['package'] == 'CAP-0603')
q &= (Query()['component']['value'] == '10nF 50V 10%')
# q = (where('component.package') == 'CAP-0603')
print(q)
result = feeders_table.search(q)


print(result)

# make sure that all data is safely written when using Caching
db.close()
