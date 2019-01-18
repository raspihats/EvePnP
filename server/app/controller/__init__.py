from flask import Blueprint
from flask_restplus import Api

from .jobs import api as ns_jobs
from .axis import api as ns_position

blueprint = Blueprint('api', __name__, url_prefix='/api')

api = Api(
    blueprint,
    title='EvePnP API',
    version='1.0',
    description='EvePnP API',
)

api.add_namespace(ns_jobs)
api.add_namespace(ns_position)
