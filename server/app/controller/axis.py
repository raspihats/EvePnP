from flask_restplus import Namespace, Resource, fields
from ..service import axis as axis_service

api = Namespace('axis', description='Axis position related operations')


axis_model = api.model('Axis', {
    'axis': fields.String(required=True, description='Axis name'),
})

axis_position_model = api.model('AxisPosition', {
    'axis': fields.String(required=True, description='Axis name'),
    'position': fields.Float(required=True, description='Position on axis')
})

axis_jog_model = api.model('AxisJog', {
    'axis': fields.String(required=True, description='Axis name'),
    'step': fields.Float(required=True, description='Step on axis')
})


@api.route('/')
class Axis(Resource):

    @api.doc('get_axis_positions')
    @api.marshal_list_with(axis_position_model)
    def get(self):
        '''Get axis current positions'''
        return axis_service.get_current_position()

    @api.doc('update_axis_positions')
    @api.expect([axis_position_model])
    def put(self):
        '''Update axis current position'''
        axis_service.move(api.payload)
        return '', 200


@api.route('/home')
class AxisHome(Resource):

    @api.doc('axis_homing')
    @api.expect([axis_model])
    def put(self):
        '''Axis homing'''
        axis_service.home(api.payload)
        return '', 200


@api.route('/park')
class AxisPark(Resource):

    @api.doc('axis_parking')
    @api.expect([axis_model])
    def put(self):
        '''Axis parking'''
        axis_service.park(api.payload)
        return '', 200


@api.route('/jog')
class AxisJog(Resource):

    @api.doc('axis_jog')
    @api.expect(axis_jog_model)
    def put(self):
        '''Axis jog'''
        axis_service.jog(api.payload)
        return '', 200
