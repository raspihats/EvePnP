from flask_restplus import Namespace, Resource, fields
from ..service import jobs as jobs_service

api = Namespace('jobs', description='Jobs related operations')

job_name = api.model('JobName', {
    'name': fields.String(required=True, description='The job name'),
})

job = api.model('Job', {
    'name': fields.String(required=True, description='The job name'),
})

@api.route('/')
class JobList(Resource):
    @api.doc('list_jobs')
    @api.marshal_list_with(job_name)
    def get(self):
        '''List all jobs'''
        return jobs_service.get_job_list()

@api.route('/<name>')
@api.param('name', 'The job name')
@api.response(200, 'Job found')
@api.response(404, 'Job not found')
class Job(Resource):
    @api.doc('get_job')
    # @api.marshal_with(job)
    def get(self, name):
        '''Fetch a job given its name'''
        job = jobs_service.get_job(name)
        if job is None:
            api.abort(404)
        return job