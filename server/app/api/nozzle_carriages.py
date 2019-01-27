from flask_restplus import Namespace, Resource, fields
from ..dao import nozzle_carriages_dao, DAO

api = Namespace('nozzle_carriages',
                description='Nozzles carriages related operations')

nozzle_carriage_offset_model = api.model('NozzleCarriageOffset', {
    'x': fields.Float(required=True, description='X axis offset'),
    'y': fields.Float(required=True, description='Y axis offset')
})

nozzle_carriage_model = api.model('NozzleCarriage', {
    'id': fields.String(required=True, description='Nozzle identifier'),
    'rotation_axis_id': fields.String(required=True, description='Nozzle rotation axis'),
    'pnp_axis_id': fields.String(required=True, description='Nozzle pick n place axis'),
    'vacuum_actuator_id': fields.String(required=True, description='Actuator identifier'),
    'offset': fields.Nested(nozzle_carriage_offset_model, required=True)
})


@api.route('/')
class NozzlesCariagesList(Resource):
    @api.doc('list_nozzle_carriages')
    @api.marshal_list_with(nozzle_carriage_model)
    def get(self):
        '''List all nozzle carriages'''
        return nozzle_carriages_dao.get_list()

    @api.doc('create_nozzle_carriage')
    @api.expect(nozzle_carriage_model)
    @api.marshal_with(nozzle_carriage_model, code=201)
    def post(self):
        '''Create a new nozzle_carriage'''
        try:
            return nozzle_carriages_dao.create(api.payload), 201
        except DAO.DocumentAlreadyExistsError:
            api.abort(400)


@api.route('/<id>')
@api.param('id', 'The nozzle carriage identifier')
@api.response(404, 'Nozzle carriage not found')
class NozzleCarriage(Resource):
    '''Operations on a single feeder item given its identifier'''

    @api.doc('get_nozzle_carriage')
    @api.marshal_with(nozzle_carriage_model)
    def get(self, id):
        '''Fetch a nozzle_carriage given its identifier'''
        try:
            nozzle_carriage = nozzle_carriages_dao.get(id)
            return nozzle_carriage
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_nozzle_carriage')
    @api.expect(nozzle_carriage_model)
    @api.marshal_with(nozzle_carriage_model)
    def put(self, id):
        '''Update a nozzle carriage given its identifier'''
        try:
            return nozzle_carriages_dao.update(id, api.payload)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('delete_nozzle_carriage')
    @api.response(204, 'Nozzle carriage deleted')
    def delete(self, id):
        '''Delete a nozzle carriage given its identifier'''
        try:
            nozzle_carriages_dao.delete(id)
            return '', 204
        except DAO.DocumentDoesNotExistError:
            api.abort(404)
