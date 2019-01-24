from flask_restplus import Namespace, Resource, fields
from ..service.motion import motion_service
from ..dao import axis_dao, DAO

api = Namespace('axis', description='Axis position related operations')


axis_id_model = api.model('AxisId', {
    'id': fields.String(required=True, description='Axis id'),
})

axis_config_model = api.model('AxisConfig', {
    'id': fields.String(required=True, description='Axis id'),
    'limit': fields.Float(required=True, description='Axis length'),
    'feed_rate': fields.Float(required=True, description='Axis max feed rate'),
    'acc': fields.Float(required=True, description='Axis max acceleration'),
    'park': fields.Float(required=True, description='Axis park position')
})

axis_position_model = api.model('AxisPosition', {
    'id': fields.String(required=True, description='Axis id'),
    'position': fields.Float(required=True, description='Position on axis')
})

axis_jog_model = api.model('AxisJog', {
    'id': fields.String(required=True, description='Axis id'),
    'step': fields.Float(required=True, description='Step on axis')
})


@api.route('/')
@api.response(201, 'Axis created')
@api.response(400, 'Axis not created')
class AxisList(Resource):
    '''Shows a list of all axes and lets you add new ones'''

    @api.doc('list_axis')
    @api.marshal_list_with(axis_config_model)
    def get(self):
        '''List all axis'''
        return axis_dao.get_list()

    @api.doc('create_axis')
    @api.expect(axis_config_model)
    @api.marshal_with(axis_config_model, code=201)
    def post(self):
        '''Create a new axis'''
        try:
            return axis_dao.create(api.payload), 201
        except DAO.DocumentAlreadyExistsError:
            api.abort(400)


@api.route('/<string:id>')
@api.param('id', 'The axis identifier')
@api.response(404, 'Axis not found')
class Axis(Resource):
    '''Operations on a single axis item given its idnetifier'''

    @api.doc('get_axis')
    @api.marshal_with(axis_config_model)
    def get(self, id):
        '''Fetch an axis given its identifier'''
        try:
            return axis_dao.get(id)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_axis')
    @api.expect(axis_config_model)
    @api.marshal_with(axis_config_model)
    def put(self, id):
        '''Update an axis given its identifier'''
        try:
            return axis_dao.update(id, api.payload)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('delete_axis')
    @api.response(204, 'Axis deleted')
    def delete(self, id):
        '''Delete an axis given its identifier'''
        try:
            axis_dao.delete(id)
            return '', 204
        except DAO.DocumentDoesNotExistError:
            api.abort(404)


@api.route('/position')
class AxisPositionsList(Resource):

    @api.doc('list_axis_positions')
    @api.marshal_list_with(axis_position_model)
    def get(self):
        '''Get axis current positions'''
        return motion_service.get_current_position()

    @api.doc('update_axis_positions')
    @api.expect([axis_position_model])
    def put(self):
        '''Update axis current positions'''
        motion_service.move(api.payload)
        return '', 200


@api.route('/position/home')
class AxisHome(Resource):

    @api.doc('axis_homing')
    @api.expect([axis_id_model])
    def put(self):
        '''Axis homing'''
        # motion_service.home(api.payload)
        motion_service.home()
        return '', 200


@api.route('position/park')
class AxisPark(Resource):

    @api.doc('axis_parking')
    @api.expect([axis_id_model])
    def put(self):
        '''Axis parking'''
        motion_service.park(api.payload)
        return '', 200


@api.route('position/jog')
class AxisJog(Resource):

    @api.doc('axis_jog')
    @api.expect(axis_jog_model)
    def put(self):
        '''Axis jog'''
        motion_service.jog(api.payload)
        return '', 200
