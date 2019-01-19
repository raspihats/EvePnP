from flask_restplus import Namespace, Resource, fields
from ..service import heads as heads_service

api = Namespace('heads', description='Heads related operations')

nozzle_model = api.model('Nozzle', {
    'id': fields.String(required=True, description='Nozzle id'),
    'rotation_axis_id': fields.String(required=True, description='Nozzle rotation axis'),
    'pnp_axis_id': fields.String(required=True, description='Nozzle pick n place axis'),
})

head_model = api.model('Head', {
    'id': fields.String(required=True, description='Head id'),
    'nozzles': fields.List(fields.Nested(nozzle_model))
})


@api.route('/')
class HeadsList(Resource):
    @api.doc('list_heads')
    @api.marshal_list_with(head_model)
    def get(self):
        '''List all heads'''
        return heads_service.get_heads_list()


@api.route('/<id>')
@api.param('id', 'The head id')
@api.response(200, 'Head found')
@api.response(404, 'Head not found')
class Head(Resource):
    @api.doc('get_head')
    @api.marshal_with(head_model)
    def get(self, id):
        '''Fetch a head given its id'''
        head = heads_service.get_head(id)
        if head is None:
            api.abort(404)
        return head
