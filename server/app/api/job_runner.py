from flask_restplus import Namespace, Resource, fields
from ..dao import DAO, jobs_dao
from ..service.job_runner import job_runner_service

api = Namespace('job_runner', description='JobRunner related operations')


job_runner_status_model = api.model('JobRunnerStatus', {
    'state': fields.String(required=True, description='State: [idle, run, pause]'),
    'job_id': fields.String(required=False, description='Job identifier'),
    'boards_ids': fields.List(fields.String, required=False, description='Placed boards ids'),
    'components_ids': fields.List(fields.String, required=False, description='Placed components ids')
})

job_runner_control_model = api.model('JobRunnerOperation', {
    # 'job_id': fields.String(required=True, description='Job identifier'),
    'command': fields.String(required=True, description='Command [start, stop, pause]')
})


@api.route('/')
class JobRunner(Resource):
    '''JobRunner status'''

    @api.doc('get_jobrunner_status')
    @api.marshal_with(job_runner_status_model)
    def get(self):
        '''Fetch status'''
        return job_runner_service.status


@api.route('/<string:id>')
@api.param('id', 'The job identifier')
@api.response(404, 'Job not found')
@api.response(400, 'Operation unknown')
class JobRunnerControl(Resource):
    '''JobRunner Control'''

    @api.doc('control_jobrunner')
    @api.expect(job_runner_control_model)
    # @api.marshal_with(job_id_model)
    def put(self, id):
        '''Start, pause, stop a job given its identifier'''
        try:
            job = jobs_dao.get(id)
            if api.payload['command'] == 'start':
                job_runner_service.start(job)
            elif api.payload['command'] == 'stop':
                job_runner_service.stop(id)
            elif api.payload['command'] == 'pause':
                job_runner_service.pause(id)
            else:
                api.abort(400)
        except DAO.DocumentDoesNotExistError:
            api.abort(404)
