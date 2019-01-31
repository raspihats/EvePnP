from .api import blueprint as api
from flask import Flask, Response, render_template
from werkzeug.debug import DebuggedApplication
from werkzeug.serving import run_with_reloader
from gevent import pywsgi


app = Flask(__name__, static_folder="../../static/dist",
            template_folder="../../static")
app.config.from_object('config')

app.register_blueprint(api, url_prefix='/api')


@app.route("/")
def index():
    return render_template('index.html')


# @run_with_reloader
def run_app():
    try:
        # app.run(host='0.0.0.0', port=5000, use_reloader=False)
        server = pywsgi.WSGIServer(('0.0.0.0', 5000), DebuggedApplication(app))
        server.serve_forever()
    finally:
        from .dao import db_hardware, db_jobs
        # make sure that all data is safely written when using Caching
        db_hardware.close()
        db_jobs.close()
        print("Finally_app_id: ", '{}'.format(id(app)))
