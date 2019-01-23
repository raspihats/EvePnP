from flask_restplus import Namespace, Resource, fields
from ..dao import feeders_dao, DAO

api = Namespace('feeders', description='Feeders related operations')

point_model = api.model('Point', {
    'x': fields.Float(required=True, description='X axis position'),
    'y': fields.Float(required=True, description='Y axis position'),
    'z': fields.Float(required=True, description='Z axis position')
})

component_model = api.model('Component', {
    'value': fields.String(required=True, description='Component value'),
    'package': fields.String(required=True, description='Component package'),
    'type': fields.String(required=True, description='Component type')
})

feeder_model = api.model('Feeder', {
    'id': fields.String(required=True, description='Feeder id'),
    'type': fields.String(required=True, description='Feeder type'),
    'size': fields.Integer(required=True, description='Feeder component max count'),
    'count': fields.Integer(required=True, description='Feeder component count'),
    'component': fields.Nested(component_model, required=True),
    'point': fields.Nested(point_model, required=True),
    'end_point': fields.Nested(point_model, required=False)
})


@api.route('/')
@api.response(201, 'Feeder created')
@api.response(400, 'Feeder not created')
class AxisList(Resource):
    '''Shows a list of all feeders and lets you add new ones'''

    @api.doc('list_feeders')
    @api.marshal_list_with(feeder_model)
    def get(self):
        '''List all feeders'''
        return feeders_dao.get_list()

    @api.doc('create_feeder')
    @api.expect(feeder_model)
    @api.marshal_with(feeder_model, code=201)
    def post(self):
        '''Create a new feeder'''
        try:
            return feeders_dao.create(api.payload), 201
        except DAO.DocumentAlreadyExistsError:
            api.abort(400)


@api.route('/<string:id>')
@api.response(404, 'Feeder not found')
@api.param('id', 'The feeder identifier')
class Axis(Resource):
    '''Operations on a single feeder item given its identifier'''

    @api.doc('get_feeder')
    @api.marshal_with(feeder_model)
    def get(self, id):
        '''Fetch a feeder given its identifier'''
        try:
            return feeders_dao.get(id)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_feeder')
    @api.expect(feeder_model)
    @api.marshal_with(feeder_model)
    def put(self, id):
        '''Update a feeder given its identifier'''
        try:
            return feeders_dao.update(id, api.payload)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('delete_feeder')
    @api.response(204, 'Feeder deleted')
    def delete(self, id):
        '''Delete a feeder given its identifier'''
        try:
            feeders_dao.delete(id)
            return '', 204
        except DAO.DocumentDoesNotExistError:
            api.abort(404)
