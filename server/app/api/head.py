from flask_restplus import Namespace, Resource, fields
from ..dao import head_dao, DAO
from ..service.job_runner import run_func, copy_keys

api = Namespace('head', description='Head related operations')

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
    'z_axis_id': fields.String(required=True, description='Pick n place axis identifier'),
    'r_axis_id': fields.String(required=True, description='Rotation axis identifier'),
    'motion_controller_zr_id': fields.String(required=True, description='Motion controller for Z/Rotation axis'),
    'offset': fields.Nested(offset_model, required=True, description='Placement head offset'),
    'vacuum_actuator_id': fields.String(required=True, description='Vacuum actuator identifier'),
    'code': fields.String(required=True, description='Move, pick and place functions')
})

head_model = api.model('Head', {
    'x_axis_id': fields.String(required=True, description='X axis identifier'),
    'y_axis_id': fields.String(required=True, description='Y axis identifier'),
    'motion_controller_xy_id': fields.String(required=True, description='Motion controller for X/Y axis'),
    'placement_heads': fields.List(fields.Nested(placement_head_model), required=True, description='List of installed placement heads'),
    'cameras': fields.List(fields.Nested(head_camera_model), required=True, description='List of installed cameras')
})


@api.route('/')
class Head(Resource):
    @api.doc('list_head_devices')
    @api.marshal_with(head_model)
    def get(self):
        '''List head installed devices'''
        return head_dao.get_first()


@api.route('/p_heads')
class PlacementHeadsList(Resource):
    @api.doc('list_placement_heads')
    @api.marshal_list_with(placement_head_model)
    def get(self):
        '''List all placement heads'''
        head = head_dao.get_first()
        return head['placement_heads']

    @api.doc('create_placement_head')
    @api.expect(placement_head_model)
    @api.marshal_with(placement_head_model, code=201)
    @api.response(403, 'Placement head id not unique')
    def post(self):
        '''Create a new placement head'''
        try:
            new_placement_head = api.payload
            head = head_dao.get_first()
            for placement_head in head['placement_heads']:
                if placement_head['id'] == new_placement_head['id']:
                    raise DAO.DocumentAlreadyExistsError()
            head['placement_heads'].append(new_placement_head)
            u_head = head_dao.update_first(head)
            for placement_head in u_head['placement_heads']:
                if placement_head['id'] == new_placement_head['id']:
                    return placement_head
            raise Exception("Failed to create a new placement head")
        except DAO.DocumentDoesNotExistError:
            api.abort(404)
        except DAO.DocumentAlreadyExistsError:
            api.abort(403)


@api.route('/p_heads/<p_id>')
@api.param('p_id', 'The placement head identifier')
@api.response(404, 'Placement head not found')
class PlacementHead(Resource):
    '''Operations on a single placement head given its identifier'''

    @api.doc('get_placement_head')
    @api.marshal_with(placement_head_model)
    def get(self, p_id):
        '''Fetch a placement head given its identifier'''
        try:
            head = head_dao.get_first()
            for placement_head in head['placement_heads']:
                if placement_head['id'] == p_id:
                    return placement_head
            raise DAO.DocumentDoesNotExistError()
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_placement_head')
    @api.expect(placement_head_model)
    @api.marshal_with(placement_head_model)
    def put(self, p_id):
        '''Update a placement head given its identifier'''
        try:
            head = head_dao.get_first()
            for placement_head in head['placement_heads']:
                if placement_head['id'] == p_id:
                    index = head['placement_heads'].index(placement_head)
                    head['placement_heads'][index] = api.payload
                    u_head = head_dao.update_first(head)
                    return u_head['placement_heads'][index]
            raise DAO.DocumentDoesNotExistError()
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('delete_placement_head')
    @api.response(200, 'Placement head deleted')
    def delete(self, p_id):
        '''Delete a placement head given its identifier'''
        try:
            head = head_dao.get_first()
            for placement_head in head['placement_heads']:
                if placement_head['id'] == p_id:
                    index = head['placement_heads'].index(placement_head)
                    head['placement_heads'].pop(index)
                    head_dao.update_first(head)
                    return 'Deleted placement head {}'.format(p_id), 200
            raise DAO.DocumentDoesNotExistError()
        except DAO.DocumentDoesNotExistError:
            api.abort(404)


placement_head_position_model = api.model('PlacementHeadPosition', {
    'id': fields.String(required=True, description='Axis identifier'),
    'position': fields.Float(required=True, description='Axis position')
})


@api.route('/p_heads/<p_id>/position')
@api.param('p_id', 'The placement head identifier')
@api.response(404, 'Placement head not found')
class PlacementHeadPosition(Resource):
    '''Operations on position of a placement head given its identifier'''

    @api.doc('get_placement_head_position')
    @api.marshal_list_with(placement_head_position_model)
    def get(self, p_id):
        '''Fetch a placement head position given its identifier'''
        head = head_dao.get_first()
        for placement_head in head['placement_heads']:
            if placement_head['id'] == p_id:
                copy_keys(head, placement_head, omit=[
                          'placement_heads', 'cameras'])
                position = run_func(placement_head, 'get_position')
                return [{'id': axis, 'position': position[axis]} for axis in position]
        api.abort(404)

    @api.doc('update_placement_head_position')
    @api.expect([placement_head_position_model])
    def put(self, p_id):
        '''Update a placement head position given its identifier'''
        head = head_dao.get_first()
        for placement_head in head['placement_heads']:
            if placement_head['id'] == p_id:
                position = {}
                for axis in api.payload:
                    position[axis['id']] = axis['position']
                copy_keys(head, placement_head, omit=[
                          'placement_heads', 'cameras'])
                run_func(placement_head, 'move', position)
                return '', 200
        api.abort(404)


placement_head_jog_model = api.model('PlacementHeadJog', {
    'id': fields.String(required=True, description='Axis identifier'),
    'step': fields.Float(required=True, description='Jog step')
})


@api.route('/p_heads/<p_id>/jog')
@api.param('p_id', 'The placement head identifier')
@api.response(404, 'Placement head not found')
class PlacementHeadJog(Resource):
    '''Jog a placement head given its identifier'''

    @api.doc('jog_placement_head')
    @api.expect(placement_head_jog_model)
    def put(self, p_id):
        '''Jog a placement head given its identifier'''
        head = head_dao.get_first()
        for placement_head in head['placement_heads']:
            if placement_head['id'] == p_id:
                copy_keys(head, placement_head, omit=[
                          'placement_heads', 'cameras'])
                run_func(placement_head, 'jog',
                         api.payload['id'], api.payload['step'])
                return '', 200
        api.abort(404)


placement_head_park_model = api.model('PlacementHeadPark', {
    'id': fields.String(required=True, description='Axis identifier')
})


@api.route('/p_heads/<p_id>/park')
@api.param('p_id', 'The placement head identifier')
@api.response(404, 'Placement head not found')
class PlacementHeadPark(Resource):
    '''Park a placement head given its identifier'''

    @api.doc('park_placement_head')
    @api.expect([placement_head_park_model])
    def put(self, p_id):
        '''Park a placement head given its identifier'''
        head = head_dao.get_first()
        for placement_head in head['placement_heads']:
            if placement_head['id'] == p_id:
                copy_keys(head, placement_head, omit=[
                          'placement_heads', 'cameras'])
                run_func(placement_head,
                         'park', [axis['id'] for axis in api.payload])
                return '', 200
        api.abort(404)


camera_position_model = api.model('CameraPosition', {
    'id': fields.String(required=True, description='Axis identifier'),
    'position': fields.Float(required=True, description='Axis position')
})


@api.route('/cameras/<c_id>/position')
@api.param('c_id', 'The camera identifier')
@api.response(404, 'Camera not found')
class CameraPosition(Resource):
    '''Operations on position of a camera given its identifier'''

    @api.doc('get_camera_position')
    @api.marshal_list_with(camera_position_model)
    def get(self, c_id):
        '''Fetch a camera position given its identifier'''
        head = head_dao.get_first()
        for camera in head['cameras']:
            if camera['id'] == c_id:
                copy_keys(head, camera, omit=[
                          'placement_heads', 'cameras'])
                position = run_func(camera, 'get_position')
                return [{'id': axis, 'position': position[axis]} for axis in position]
        api.abort(404)

    @api.doc('update_camera_position')
    @api.expect([camera_position_model])
    def put(self, c_id):
        '''Update a camera position given its identifier'''

        head = head_dao.get_first()
        for camera in head['cameras']:
            if camera['id'] == c_id:
                position = {}
                for axis in api.payload:
                    position[axis['id']] = axis['position']
                copy_keys(head, camera, omit=[
                          'placement_heads', 'cameras'])
                run_func(camera, 'move', position)
                return '', 200
        api.abort(404)
