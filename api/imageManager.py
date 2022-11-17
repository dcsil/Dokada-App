from .db import getCollection
def store_image():
    collection = getCollection()
    collection.insert_one({"name": "John"})

   
