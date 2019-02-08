from flask_restplus import Namespace, Resource, fields
from ..dao import jobs_dao, DAO
# from ..service.job_runner import job_runner_service

api = Namespace('jobs', description='Jobs related operations')

job_id_model = api.model('JobId', {
    'id': fields.String(required=True, description='Job identifier or name'),
})

origin_model = api.model('Board origin point', {
    'x': fields.Float(required=True, description='X axis position'),
    'y': fields.Float(required=True, description='Y axis position'),
    'z': fields.Float(required=True, description='Z axis position')
})

board_model = api.model('Board', {
    'id': fields.String(required=True, description='Board identifier'),
    'origin': fields.Nested(origin_model, required=True, description='Board origin'),
    'rotation': fields.Float(required=True, description='Board rotation angle'),
    'operation': fields.String(required=True, description='Board action')
})

offset_model = api.model('Component offset point', {
    'x': fields.Float(required=True, description='X axis position'),
    'y': fields.Float(required=True, description='Y axis position')
})

component_model = api.model('Component', {
    'id': fields.String(required=True, description='Component identifier'),
    'value': fields.String(required=True, description='Component value'),
    'package': fields.String(required=True, description='Component package'),
    'offset': fields.Nested(offset_model, required=True, description='Component ofsset point'),
    'rotation': fields.Float(required=True, description='Component rotation angle'),
    'operation': fields.String(required=True, description='Component action')
})

job_model = api.model('Job', {
    'id': fields.String(required=True, description='Job name'),
    'boards': fields.List(fields.Nested(board_model), required=True),
    'components': fields.List(fields.Nested(component_model), required=True)
})


@api.route('/')
@api.response(201, 'Job created')
@api.response(400, 'Job not created')
class JobList(Resource):
    '''Shows a list of all jobs and lets you add new ones'''

    @api.doc('list_jobs_ids')
    @api.marshal_list_with(job_id_model)
    def get(self):
        '''List all jobs ids'''
        jobs = jobs_dao.get_list()
        job_ids = []
        for job in jobs:
            job_ids.append({'id': job['id']})
        return job_ids

    @api.doc('create_job')
    @api.expect(job_model)
    @api.marshal_with(job_model, code=201)
    def post(self):
        '''Create a new job'''
        try:
            return jobs_dao.create(api.payload), 201
        except DAO.DocumentAlreadyExistsError:
            api.abort(400)


@api.route('/<string:id>')
@api.param('id', 'The job identifier')
@api.response(404, 'Job not found')
class Job(Resource):
    '''Operations on a single job item given its identifier'''

    @api.doc('get_job')
    @api.marshal_with(job_model)
    def get(self, id):
        '''Fetch a job given its identifier'''
        try:
            return jobs_dao.get(id)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('update_job')
    @api.expect(job_model)
    @api.marshal_with(job_model)
    def put(self, id):
        '''Update a job given its identifier'''
        try:
            return jobs_dao.update(id, api.payload)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)

    @api.doc('delete_job')
    @api.response(204, 'Job deleted')
    def delete(self, id):
        '''Delete a job given its identifier'''
        try:
            jobs_dao.delete(id)
            return '', 204
        except DAO.DocumentDoesNotExistError:
            api.abort(404)


board_progess_model = api.model('BoardProgress', {
    'id': fields.String(required=True, description='Board id'),
    'components_ids': fields.List(fields.String, required=False, description='Placed components ids')
})

job_runner_status_model = api.model('JobRunnerStatus', {
    'id': fields.String(required=True, description='Running job name'),
    'boards': fields.List(fields.Nested(board_progess_model), required=False, description='Placed componets ids')
})

job_runner_control_model = api.model('JobRunnerOperation', {
    'id': fields.String(required=True, description='Job name'),
    'operation': fields.String(required=True, description='Operation: start, stop and pause')
})


@api.route('/runner')
# @api.param('id', 'The job identifier')
@api.response(404, 'Job not found')
class JobRunner(Resource):
    '''JobRunner status'''

    @api.doc('get_jobrunner_status')
    @api.marshal_with(job_runner_status_model)
    def get(self):
        '''Fetch status'''
        return job_runner_service.get_progress()


@api.route('/runner/<string:id>')
@api.param('id', 'The job identifier')
@api.response(400, 'Operation unknown')
@api.response(404, 'Operation not allowed')
class JobRunnerControl(Resource):
    '''Control JobRunner'''

    @api.doc('control_jobrunner')
    @api.expect(job_runner_control_model)
    # @api.marshal_with(job_id_model)
    def put(self, id):
        '''Start, pause, stop a job given its identifier'''
        if api.payload['operation'] == 'start':
            job_runner_service.start(id)
        elif api.payload['operation'] == 'stop':
            job_runner_service.stop(id)
        elif api.payload['operation'] == 'pause':
            job_runner_service.pause(id)
        else:
            api.abort(400)
