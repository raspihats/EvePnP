from flask_restplus import Namespace, Resource, fields
from ..dao import packages_dao, DAO

api = Namespace('packages', description='Packages related operations')


package_model = api.model('Package', {
    'id': fields.String(required=True, description='Package id'),
    'length': fields.Float(description='Package length in mm', required=True),
    'width': fields.Float(description='Package width in mm', required=True),
    'height': fields.Float(description='Package height in mm', required=True)
})


@api.route('/')
class PackagesList(Resource):
    @api.doc('list_packages')
    @api.marshal_list_with(package_model)
    def get(self):
        '''List all packages'''
        return packages_dao.get_list()

    @api.doc('create_package')
    @api.expect(package_model)
    @api.marshal_with(package_model, code=201)
    def post(self):
        '''Create a new package'''
        try:
            return packages_dao.create(api.payload), 201
        except DAO.DocumentAlreadyExistsError:
            api.abort(400)


@api.route('/<id>')
@api.param('id', 'The package identifier')
@api.response(404, 'Package not found')
class Package(Resource):
    '''Operations on a single feeder item given its identifier'''

    @api.doc('get_package')
    @api.marshal_with(package_model)
    def get(self, id):
        '''Fetch a package given its identifier'''
        try:
            package = packages_dao.get(id)
            return package
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_package')
    @api.expect(package_model)
    @api.marshal_with(package_model)
    def put(self, id):
        '''Update a package given its identifier'''
        try:
            return packages_dao.update(id, api.payload)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('delete_package')
    @api.response(204, 'Package deleted')
    def delete(self, id):
        '''Delete a package given its identifier'''
        try:
            packages_dao.delete(id)
            return '', 204
        except DAO.DocumentDoesNotExistError:
            api.abort(404)
