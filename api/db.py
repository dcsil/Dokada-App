from flask import Flask
from flask_pymongo import pymongo
from dotenv import load_dotenv
import os

load_dotenv()
USER = os.getenv("user")
PASSWORD = os.getenv("password")

CONNECTION_STRING = "mongodb+srv://" + USER + ":" + PASSWORD + "@cluster0.aiofrm2.mongodb.net/?retryWrites=true&w=majority"
print(CONNECTION_STRING)
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('TestDB')
#user_collection = pymongo.collection.Collection(db, 'imageData')

def getClient():
    return db
