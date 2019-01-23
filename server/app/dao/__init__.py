from tinydb import TinyDB, where
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware

hardware_config_db = TinyDB('hardware_config.json',
                            storage=CachingMiddleware(JSONStorage))


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
        self._on_change = None

    def register_on_change(self, func):
        self._on_change = func

    # def load_config(self, config):
    #     self._list = config
    #     if self._on_change is not None:
    #         self._on_change()

    def get_list(self):
        return self._db_table.all()

    def create(self, data):
        result = self._db_table.get(where('id') == data['id'])
        if result is not None:
            raise DAO.DocumentAlreadyExistsError(
                "Cant' create document for id: {}".format(data['id']))
        else:
            self._db_table.insert(data)
            if self._on_change is not None:
                self._on_change()
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
            if self._on_change is not None:
                self._on_change()
            return self.get(id)

    def delete(self, id):
        result = self._db_table.remove(where('id') == id)
        if len(result) == 0:
            raise DAO.DocumentDoesNotExistError(
                "No document found for id: {}".format(id))
        elif len(result) > 1:
            raise DAO.DocumentIdNotUniqueError(
                "Multiple documents found for id: {}".format(id))
        else:
            if self._on_change is not None:
                self._on_change()


axis_dao = DAO(hardware_config_db, 'axis')
actuators_dao = DAO(hardware_config_db, 'actuators')
heads_dao = DAO(hardware_config_db, 'axis')
controllers_dao = DAO(hardware_config_db, 'controllers')
feeders_dao = DAO(hardware_config_db, 'feeders')
# jobs_dao = DAO(hardware_config_db, 'axis')
