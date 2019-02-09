from flask import Blueprint
from flask_restplus import Api

from .actuators import api as ns_actuators
from .axis import api as ns_axis
from .head import api as ns_head
from .feeders import api as ns_feeders
from .packages import api as ns_packages
from .jobs import api as ns_jobs

blueprint = Blueprint('api', __name__, url_prefix='/api')

api = Api(
    blueprint,
    title='EvePnP API',
    version='1.0',
    description='EvePnP API',
)


api.add_namespace(ns_actuators)
api.add_namespace(ns_axis)
api.add_namespace(ns_head)
api.add_namespace(ns_feeders)
api.add_namespace(ns_packages)
api.add_namespace(ns_jobs)
