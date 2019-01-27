from flask_restplus import Namespace, Resource, fields
from ..dao import heads_dao, DAO

api = Namespace('heads', description='Heads related operations')

offset_model = api.model('Offset', {
    'x': fields.Float(required=True, description='X axis offset'),
    'y': fields.Float(required=True, description='Y axis offset')
})

head_offset_model = api.model('Head offset', {
    'id': fields.String(required=True, description='Head id'),
    'offset': fields.Nested(offset_model, required=True)
})

head_model = api.model('Head', {
    'id': fields.String(required=True, description='Head id'),
    'nozzle_carriages': fields.List(fields.Nested(head_offset_model), description='Installed nozzle carriages offsets', required=True),
    'cameras': fields.List(fields.Nested(head_offset_model), description='Installed cameras offsets', required=True)
})


@api.route('/')
class HeadsList(Resource):
    @api.doc('list_heads')
    @api.marshal_list_with(head_model)
    def get(self):
        '''List all heads'''
        return heads_dao.get_list()

    @api.doc('create_head')
    @api.expect(head_model)
    @api.marshal_with(head_model, code=201)
    def post(self):
        '''Create a new head'''
        try:
            return heads_dao.create(api.payload), 201
        except DAO.DocumentAlreadyExistsError:
            api.abort(400)


@api.route('/<id>')
@api.param('id', 'The head identifier')
@api.response(404, 'Head not found')
class Head(Resource):
    '''Operations on a single feeder item given its identifier'''

    @api.doc('get_head')
    @api.marshal_with(head_model)
    def get(self, id):
        '''Fetch a head given its identifier'''
        try:
            head = heads_dao.get(id)
            return head
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_head')
    @api.expect(head_model)
    @api.marshal_with(head_model)
    def put(self, id):
        '''Update a head given its identifier'''
        try:
            return heads_dao.update(id, api.payload)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('delete_head')
    @api.response(204, 'Head deleted')
    def delete(self, id):
        '''Delete a head given its identifier'''
        try:
            heads_dao.delete(id)
            return '', 204
        except DAO.DocumentDoesNotExistError:
            api.abort(404)
