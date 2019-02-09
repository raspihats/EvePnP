from tinydb import TinyDB, where
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
db_hardware = TinyDB('db_hardware.json',
                     storage=CachingMiddleware(JSONStorage))
db_jobs = TinyDB('db_jobs.json', storage=CachingMiddleware(JSONStorage))


class DAO(object):

    class DocumentAlreadyExistsError(Exception):
        def __init__(self, *args, **kwargs):
            Exception.__init__(self, *args, **kwargs)

    class DocumentDoesNotExistError(Exception):
        def __init__(self, *args, **kwargs):
            Exception.__init__(self, *args, **kwargs)

    class DocumentIdNotUniqueError(Exception):
        def __init__(self, *args, **kwargs):
            Exception.__init__(self, *args, **kwargs)

    def __init__(self, db, table):
        self._db_table = db.table(table)
        self._on_change = []

    def _fire_on_change(self):
        for on_change in self._on_change:
            on_change()

    def register_on_change(self, func):
        self._on_change.append(func)

    def get_list(self):
        return self._db_table.all()

    def create(self, data):
        result = self._db_table.get(where('id') == data['id'])
        if result is not None:
            raise DAO.DocumentAlreadyExistsError(
                "Cant' create document for id: {}".format(data['id']))
        else:
            self._db_table.insert(data)
            self._fire_on_change()
            return self._db_table.get(where('id') == data['id'])

    def get(self, id):
        result = self._db_table.get(where('id') == id)
        if result is None:
            raise DAO.DocumentDoesNotExistError(
                "No document found for id: {}".format(id))
        return result

    def update(self, id, data):
        result = self._db_table.update(data, where('id') == id)
        if len(result) == 0:
            raise DAO.DocumentDoesNotExistError(
                "No document found for id: {}".format(id))
        elif len(result) > 1:
            raise DAO.DocumentIdNotUniqueError(
                "Multiple documents found for id: {}".format(id))
        else:
            self._fire_on_change()
            return self.get(id)

    def get_first(self):
        result = self._db_table.all()
        if len(result) < 1:
            raise DAO.DocumentDoesNotExistError("No document found")
        return result[0]

    def update_first(self, data):
        data_list = self._db_table.all()
        self._db_table.purge()
        if len(data_list) == 0:
            self._db_table.insert(data)
        else:
            data_list[0] = data
            self._db_table.insert_multiple(data_list)
        return self._db_table.all()[0]

    def delete(self, id):
        result = self._db_table.remove(where('id') == id)
        if len(result) == 0:
            raise DAO.DocumentDoesNotExistError(
                "No document found for id: {}".format(id))
        elif len(result) > 1:
            raise DAO.DocumentIdNotUniqueError(
                "Multiple documents found for id: {}".format(id))
        else:
            self._fire_on_change()

    def search(self, query):
        # query = None
        # for key in d:
        #     if query is None:
        #         query = (where(key) == d[key])
        #     else:
        #         query &= (where(key) == d[key])
        return self._db_table.search(query)


actuators_dao = DAO(db_hardware, 'actuators')
axis_dao = DAO(db_hardware, 'axis')
nozzle_carriages_dao = DAO(db_hardware, 'nozzle_carriages')
head_dao = DAO(db_hardware, 'head')
controllers_dao = DAO(db_hardware, 'controllers')
feeders_dao = DAO(db_hardware, 'feeders')
packages_dao = DAO(db_hardware, 'packages')
jobs_dao = DAO(db_jobs, 'jobs')
