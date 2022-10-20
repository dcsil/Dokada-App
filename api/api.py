from flask import Flask

app = Flask(__name__)

@app.route('/greeting')
def greet():
    return "hello"
