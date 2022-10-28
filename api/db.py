from flask import Flask
from flask_pymongo import pymongo
import api

CONNECTION_STRING = "mongodb+srv://dokada:123@cluster0.aiofrm2.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('flask_mongodb_atlas')
user_collection = pymongo.collection.Collection(db, 'user_collection')
