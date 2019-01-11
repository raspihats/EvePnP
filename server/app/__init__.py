from flask import Flask, Response, render_template

app = Flask(__name__, static_folder="../../static/dist", template_folder="../../static")
app.config.from_object('config')


@app.route("/")
def index():
    return render_template('index.html')

def run_app():
    try:
        app.run(host='0.0.0.0', port=5000)
        # socketio.run(app, host='0.0.0.0', port=5000)
    finally:
        print("Finally_app_id: ", '{}'.format(id(app)))
