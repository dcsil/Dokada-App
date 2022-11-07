from flask import Flask
from flask_restful import Api, Resource, reqparse
#import db

   
app = Flask(__name__)

@app.route('/greeting', methods=['GET', 'POST'])
def greet():
    return "hello"

@app.route("/test")
def test():
    #db.db.collection.insert_one({"name": "John"})
    return "Connected to the data base!"

def get_app():
    return app

if __name__ == "main":
    app.run(debug=True)
