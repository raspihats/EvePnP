from flask import Blueprint
from flask_restplus import Api

from .jobs import api as ns_jobs

blueprint = Blueprint('api', __name__, url_prefix='/api')

api = Api(
    blueprint,
    title='EvePnP API',
    version='1.0',
    description='EvePnP API',
)

api.add_namespace(ns_jobs)