from flask import Flask
import db

app = Flask(__name__)

@app.route('/greeting')
def greet():
    return "hello"

@app.route("/test")
def test():
    db.db.collection.insert_one({"name": "John"})
    return "Connected to the data base!"

if __name__ == "main":
    app.run()
