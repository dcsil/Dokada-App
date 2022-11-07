from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
#from api.greet import greet

app = Flask(__name__, static_url_path='/', static_folder='build')
CORS(app) #comment this on deployment
api = Api(app)

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder,'index.html')

@app.route('/')
def index():
    return send_from_directory(app.static_folder,'index.html')


"""
@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')
    

@app.route("/canvas", defaults={'path':''})
def serve_canvas(path):
    return send_from_directory(app.static_folder,'index.html')
"""

#api.add_resource(greet, '/greeting')
