from flask import Blueprint
from flask_restplus import Api

from .axis import api as ns_axis
from .heads import api as ns_heads
from .actuators import api as ns_actuators
from .feeders import api as ns_feeders
from .jobs import api as ns_jobs

blueprint = Blueprint('api', __name__, url_prefix='/api')

api = Api(
    blueprint,
    title='EvePnP API',
    version='1.0',
    description='EvePnP API',
)


api.add_namespace(ns_axis)
# api.add_namespace(ns_heads)
api.add_namespace(ns_actuators)
api.add_namespace(ns_feeders)
api.add_namespace(ns_jobs)
