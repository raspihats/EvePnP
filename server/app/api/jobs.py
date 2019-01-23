from flask_restplus import Namespace, Resource, fields
from ..dao import jobs_dao, DAO

api = Namespace('jobs', description='Jobs related operations')

job_id_model = api.model('JobId', {
    'id': fields.String(required=True, description='Job identifier or name'),
})

component_model = api.model('Component', {
    'id': fields.String(description='Component identifier'),
    'value': fields.String(description='Component value'),
    'package': fields.String(description='Component package'),
    'x': fields.Float(description='Component x position'),
    'y': fields.Float(description='Component y position'),
    'angle': fields.Float(description='Component rotation'),
    'type': fields.String(description='Component type')
})

job_model = api.model('Job', {
    'id': fields.String(required=True, description='Job name'),
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
