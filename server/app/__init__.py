from flask import Flask, Response, render_template
from .api import blueprint as api
from .dao import hardware_config_db

app = Flask(__name__, static_folder="../../static/dist",
            template_folder="../../static")
app.config.from_object('config')

app.register_blueprint(api, url_prefix='/api')


@app.route("/")
def index():
    return render_template('index.html')


def run_app():
    try:
        app.run(host='0.0.0.0', port=5000)
    finally:
        # make sure that all data is safely written when using Caching
        hardware_config_db.close()
        print("Finally_app_id: ", '{}'.format(id(app)))
