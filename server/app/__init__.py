from flask import Flask, Response, render_template
from .api import blueprint as api


app = Flask(__name__, static_folder="../../static/dist",
            template_folder="../../static")
app.config.from_object('config')

app.register_blueprint(api, url_prefix='/api')


@app.route("/")
def index():
    return render_template('index.html')


def run_app():
    try:
        app.run(host='0.0.0.0', port=5000, use_reloader=False)
    finally:
        from .dao import db_hardware, db_jobs
        # make sure that all data is safely written when using Caching
        db_hardware.close()
        db_jobs.close()
        print("Finally_app_id: ", '{}'.format(id(app)))
