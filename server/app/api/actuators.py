from flask_restplus import Namespace, Resource, fields
from ..dao import actuators_dao, DAO
from ..service.actuators import actuators_service

api = Namespace('actuators', description='Actuators related operations')

actuator_model = api.model('Actuator', {
    'id': fields.String(required=True, description='Actuator id'),
    'type': fields.String(required=True, description='Actuator type'),
    'initial_value': fields.Float(required=True, description='Actuator initial value'),
    'set_code': fields.String(required=True, description='Actuator initial value'),
    'get_code': fields.String(required=True, description='Actuator initial value')
})

actuator_value_model = api.model('ActuatorValue', {
    'id': fields.String(required=True, description='Actuator id'),
    'type': fields.String(required=False, description='Actuator type'),
    'value': fields.Float(required=True, description='Actuator value')
})


@api.route('/')
@api.response(201, 'Actuator created')
@api.response(400, 'Actuator not created')
class ActuatorsList(Resource):
    @api.doc('list_actuators')
    @api.marshal_list_with(actuator_model)
    def get(self):
        '''List all actuators'''
        return actuators_dao.get_list()

    @api.doc('create_actuator')
    @api.expect(actuator_model)
    @api.marshal_with(actuator_model, code=201)
    def post(self):
        '''Create a new actuator'''
        try:
            return actuators_dao.create(api.payload), 201
        except DAO.DocumentAlreadyExistsError:
            api.abort(400)


@api.route('/<id>')
@api.param('id', 'The actuator identifier')
@api.response(404, 'Actuator not found')
class Actuator(Resource):
    @api.doc('get_actuator')
    @api.marshal_with(actuator_model)
    def get(self, id):
        '''Fetch an actuator given its id'''
        try:
            return actuators_dao.get(id)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_actuator')
    @api.expect(actuator_model)
    @api.marshal_with(actuator_model)
    def put(self, id):
        '''Update an actuator given its id'''
        try:
            return actuators_dao.update(id, api.payload)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('delete_actuator')
    @api.response(204, 'Actuator deleted')
    def delete(self, id):
        '''Delete an actuator given its identifier'''
        try:
            actuators_dao.delete(id)
            return '', 204
        except DAO.DocumentDoesNotExistError:
            api.abort(404)


@api.route('/values')
class ActuatorsValuesList(Resource):
    @api.doc('list_actuators_values')
    @api.marshal_list_with(actuator_value_model)
    def get(self):
        '''List all actuators values'''
        return actuators_service.get_values_list()


@api.route('/values/<id>')
@api.param('id', 'The actuator identifier')
@api.response(404, 'Actuator not found')
class ActuatorValue(Resource):
    @api.doc('get_actuator_value')
    @api.marshal_with(actuator_value_model)
    def get(self, id):
        '''Fetch an actuator value given its id'''
        try:
            return actuators_service.get_value(id)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_actuator_value')
    @api.expect(actuator_value_model)
    @api.marshal_with(actuator_value_model)
    def put(self, id):
        '''Update an actuator value given its id'''
        try:
            return actuators_service.update_value(id, api.payload)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)
