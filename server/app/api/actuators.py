from flask_restplus import Namespace, Resource, fields
# from ..service import actuators as actuators_service

api = Namespace('actuators', description='Actuators related operations')

actuator_model = api.model('Actuator', {
    'id': fields.String(required=True, description='Actuator id'),
    'type': fields.String(required=True, description='Actuator type'),
    'value': fields.Float(required=True, description='Actuator value'),
})


@api.route('/')
class ActuatorsList(Resource):
    @api.doc('list_actuators')
    @api.marshal_list_with(actuator_model)
    def get(self):
        '''List all actuators'''
        return actuators_service.get_actuators_list()


@api.route('/<id>')
@api.param('id', 'The actuator id')
@api.response(200, 'Actuator found')
@api.response(404, 'Actuator not found')
class Actuator(Resource):
    @api.doc('get_actuator')
    @api.marshal_with(actuator_model)
    def get(self, id):
        '''Fetch an actuator given its id'''
        actuator = actuators_service.get_actuator(id)
        if actuator is None:
            api.abort(404)
        return actuator

    @api.doc('update_actuator')
    @api.expect(actuator_model)
    @api.marshal_with(actuator_model)
    def put(self, id):
        '''Update an actuator given its id'''
        actuator = actuators_service.update_actuator(id, api.payload)
        if actuator is None:
            api.abort(404)
        return actuator
