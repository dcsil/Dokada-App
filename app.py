import json
from flask import Flask, send_from_directory, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from api.imageManager import store_reviews, get_review, get_product
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

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

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(app)

@api.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response


@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body


@app.errorhandler(404)
def not_found(e):
    print("Not Found")
    return send_from_directory(app.static_folder,'index.html'), 201

@app.route('/')
def index():
    print("Index")
    return send_from_directory(app.static_folder,'index.html'), 201

@app.route('/debug-sentry')
def trigger_error():
    division_by_zero = 1 / 0

@app.route('/image-api', methods = ['POST', 'GET'])
def image_portal():

    print("Image api")
    print(request)
    requestBody = request.get_json()
    print(requestBody)
    
    if requestBody['option'] == 'store-review':
        print("Save image")
        store_reviews(requestBody['content'])
        response = {
            'content': 'received'
        }
        return response, 200
    elif requestBody['option'] == 'get-review':
        print("Retrieve image")
        reviews = get_review(requestBody['content'])
        print(reviews)
        response = {
            'content': reviews
        }
        return response, 200

@app.route('/product-api', methods = ['POST', 'GET'])
def product_portal():

    requestBody = request.get_json()

    if requestBody['option'] == 'store-product':
        
        store_reviews(requestBody['content'])
        response = {
            'content': 'received'
        }
        return response, 200

    elif requestBody['option'] == 'get-product':
       
        product = get_product(requestBody['content'])
        
        response = {
            'content': product
        }
        return response, 200


"""
@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')
    

@app.route("/canvas", defaults={'path':''})
def serve_canvas(path):
    return send_from_directory(app.static_folder,'index.html')
"""

#api.add_resource(greet, '/greeting')
def get_app():
    return app