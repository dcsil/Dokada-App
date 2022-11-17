from flask import Flask
from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://dokada:123@cluster0.aiofrm2.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('Deployment')
user_collection = pymongo.collection.Collection(db, 'imageData')

def getCollection():
    return user_collection
