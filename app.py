from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
#from api.greet import greet
sentry_sdk.init(
    dsn="https://7f5de5cc77444f6f893d648f9a16c7de@o4504119699636224.ingest.sentry.io/4504119699636224",
    integrations=[
        FlaskIntegration(),
    ],

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0
)
app = Flask(__name__, static_url_path='/', static_folder='build')
CORS(app) #comment this on deployment
api = Api(app)

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder,'index.html')

@app.route('/')
def index():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/debug-sentry')
def trigger_error():
    division_by_zero = 1 / 0

"""
@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')
    

@app.route("/canvas", defaults={'path':''})
def serve_canvas(path):
    return send_from_directory(app.static_folder,'index.html')
"""

#api.add_resource(greet, '/greeting')
