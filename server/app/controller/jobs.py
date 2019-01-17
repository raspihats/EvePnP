from flask_restplus import Namespace, Resource, fields
from ..service import jobs as jobs_service

api = Namespace('jobs', description='Jobs related operations')

job_name_model = api.model('JobName', {
    'name': fields.String(required=True, description='Job name'),
})

component_model = api.model('Component', {
    'name': fields.String(description='Component name'),
    'value': fields.String(description='Component value'),
    'package': fields.String(description='Component package'),
    'x': fields.Float(description='Component x position'),
    'y': fields.Float(description='Component y position'),
    'angle': fields.Float(description='Component rotation'),
    'type': fields.String(description='Component type')
})

job_model = api.model('Job', {
    'name': fields.String(required=True, description='Job name'),
    'components': fields.List(fields.Nested(component_model))
})


@api.route('/')
class JobList(Resource):
    @api.doc('list_jobs')
    @api.marshal_list_with(job_name_model)
    def get(self):
        '''List all jobs'''
        return jobs_service.get_job_list()


@api.route('/<name>')
@api.param('name', 'The job name')
@api.response(200, 'Job found')
@api.response(404, 'Job not found')
class Job(Resource):
    @api.doc('get_job')
    @api.marshal_with(job_model)
    def get(self, name):
        '''Fetch a job given its name'''
        job = jobs_service.get_job(name)
        if job is None:
            api.abort(404)
        return job
