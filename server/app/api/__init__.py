from flask import Blueprint
from flask_restplus import Api

from .actuators import api as ns_actuators
from .axis import api as ns_axis
from .nozzle_carriages import api as ns_nozzle_carriages
from .heads import api as ns_heads
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
api.add_namespace(ns_nozzle_carriages)
api.add_namespace(ns_heads)
api.add_namespace(ns_feeders)
api.add_namespace(ns_packages)
api.add_namespace(ns_jobs)
