from .axis import axis_position_model
from flask_restplus import Namespace, Resource, fields
from ..dao import heads_dao, DAO
from ..service import run_func

api = Namespace('heads', description='Heads related operations')

offset_model = api.model('Offset', {
    'x': fields.Float(required=True, description='X axis offset'),
    'y': fields.Float(required=True, description='Y axis offset')
})

head_camera_model = api.model('HeadCamera', {
    'id': fields.String(required=True, description='Camera identifier'),
    'offset': fields.Nested(offset_model, required=True, description='Camera offset')
})

placement_head_model = api.model('PlacementHead', {
    'id': fields.String(required=True, description='Placement head identifier'),
    'offset': fields.Nested(offset_model, required=True, description='Placement head offset'),
    'pnp_axis_id': fields.String(required=True, description='Pick n place axis'),
    'rotation_axis_id': fields.String(required=True, description='Rotation axis'),
    'vacuum_actuator_id': fields.String(required=True, description='Vacuum actuator identifier'),
    'code': fields.String(required=True, description='Move, pick and place functions')
})

head_model = api.model('Head', {
    'id': fields.String(required=True, description='Head identifier'),
    'motion_controller_id': fields.String(required=True, description='Identifier of the motion controller that moves this head in x/y'),
    'placement_heads': fields.List(fields.Nested(placement_head_model), required=True, description='List of installed placement heads'),
    'cameras': fields.List(fields.Nested(head_camera_model), required=True, description='List of installed cameras')
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
    '''Operations on a single head given its identifier'''

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


@api.route('/<id>/p_heads')
@api.param('id', 'The head identifier')
@api.response(404, 'Head not found')
class PlacementHeadsList(Resource):
    @api.doc('list_placement_heads')
    @api.marshal_list_with(placement_head_model)
    def get(self, id):
        '''List all placement heads for a given head identifier'''
        try:
            head = heads_dao.get(id)
            return head['placement_heads']
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('create_placement_head')
    @api.expect(placement_head_model)
    @api.marshal_with(placement_head_model, code=201)
    @api.response(403, 'Placement head id not unique')
    def post(self, id):
        '''Create a new placement head'''
        try:
            new_placement_head = api.payload
            head = heads_dao.get(id)
            for placement_head in head['placement_heads']:
                if placement_head['id'] == new_placement_head['id']:
                    raise DAO.DocumentAlreadyExistsError()
            head['placement_heads'].append(new_placement_head)
            u_head = heads_dao.update(id, head)
            for placement_head in u_head['placement_heads']:
                if placement_head['id'] == new_placement_head['id']:
                    return placement_head
            raise Exception("Failed to create a new placement head")
        except DAO.DocumentDoesNotExistError:
            api.abort(404)
        except DAO.DocumentAlreadyExistsError:
            api.abort(403)


@api.route('/<id>/p_heads/<p_id>')
@api.param('id', 'The head identifier')
@api.param('p_id', 'The placement head identifier')
@api.response(404, 'Head or placement head not found')
class PlacementHead(Resource):
    '''Operations on a single placement head given its identifier'''

    @api.doc('get_placement_head')
    @api.marshal_with(placement_head_model)
    def get(self, id, p_id):
        '''Fetch a placement head given its identifier'''
        try:
            head = heads_dao.get(id)
            for placement_head in head['placement_heads']:
                if placement_head['id'] == p_id:
                    return placement_head
            raise DAO.DocumentDoesNotExistError()
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_placement_head')
    @api.expect(placement_head_model)
    @api.marshal_with(placement_head_model)
    def put(self, id, p_id):
        '''Update a placement head given its identifier'''
        try:
            head = heads_dao.get(id)
            for placement_head in head['placement_heads']:
                if placement_head['id'] == p_id:
                    index = head['placement_heads'].index(placement_head)
                    head['placement_heads'][index] = api.payload
                    u_head = heads_dao.update(id, head)
                    return u_head['placement_heads'][index]
            raise DAO.DocumentDoesNotExistError()
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('delete_placement_head')
    @api.response(204, 'Placement head deleted')
    def delete(self, id, p_id):
        '''Delete a placement head given its identifier'''
        try:
            head = heads_dao.get(id)
            for placement_head in head['placement_heads']:
                if placement_head['id'] == p_id:
                    index = head['placement_heads'].index(placement_head)
                    head['placement_heads'].pop(index)
                    heads_dao.update(id, head)
                    return '', 204
            raise DAO.DocumentDoesNotExistError()
        except DAO.DocumentDoesNotExistError:
            api.abort(404)


placement_head_position_model = api.model('PlacementHeadPosition', {
    'point': fields.List(fields.Nested(axis_position_model), required=True, description='Placement head point'),
    'rotation': fields.Float(required=True, description='Placement head rotation angle')
})


@api.route('/<id>/p_heads/<p_id>/position')
@api.param('id', 'The head identifier')
@api.param('p_id', 'The placement head identifier')
@api.response(404, 'Head or placement head not found')
class PlacementHeadPosition(Resource):
    '''Operations on position of a placement head given its identifier'''

    @api.doc('get_placement_head_position')
    @api.marshal_with(placement_head_position_model)
    def get(self, id, p_id):
        '''Fetch a placement head position given its identifier'''
        try:
            head = heads_dao.get(id)
            for placement_head in head['placement_heads']:
                if placement_head['id'] == p_id:
                    point, rotation = run_func(
                        placement_head, 'get_position')
                    return {
                        'point': [{'id': axis, 'position': point[axis]} for axis in point],
                        'rotation': rotation
                    }
            raise DAO.DocumentDoesNotExistError()
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_placement_head_position')
    @api.expect(placement_head_position_model)
    # @api.marshal_with(placement_head_position_model)
    def put(self, id, p_id):
        '''Update a placement head position given its identifier'''
        try:
            head = heads_dao.get(id)
            for placement_head in head['placement_heads']:
                if placement_head['id'] == p_id:
                    point = {}
                    for axis in api.payload['point']:
                        point[axis['id']] = axis['position']
                    rotation = api.payload['rotation']
                    run_func(placement_head,
                             'move', point, rotation)
                    return '', 200
            raise DAO.DocumentDoesNotExistError()
        except DAO.DocumentDoesNotExistError:
            api.abort(404)
