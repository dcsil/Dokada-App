from .db import getClient
from .dataAnalyzer import aggregate_review
import datetime

db = getClient()

def store_reviews(data):
    #data comes in as a dictionary containing parsed JSON, check documentations for the format of this request

    product_info = data["product_info"]
    
    #save the product's information if not found in db
    #Also initialize its aggregate data
    if db.products.find_one({"product_id": product_info["product_id"]}) == None:        
        
        zeroArr = [0]*product_info["imageDimensions"]["width"]*product_info["imageDimensions"]["height"]
        product_info["reviews_count"] = 0
        product_info["images"] = {
            "quality": {
                    "positive": { 
                        "map": zeroArr,
                        "max": 0
                        }, 
                    "negative": {
                        "map": zeroArr,
                        "min": 0
                        }, 
                    "posCount": { 
                        "map": zeroArr,
                        "max": 0
                        },
                    "negCount": {
                        "map": zeroArr,
                        "min": 0
                        },
                    "bias": {
                        "map": zeroArr,
                        "max": 0
                        }, 
                }, 
            "fit": {
                    "positive": { 
                        "map": zeroArr,
                        "max": 0
                        }, 
                    "negative": {
                        "map": zeroArr,
                        "min": 0
                        }, 
                    "posCount": { 
                        "map": zeroArr,
                        "max": 0
                        },
                    "negCount": {
                        "map": zeroArr,
                        "min": 0
                        },
                    "bias": {
                        "map": zeroArr,
                        "max": 0
                        }, 
                }, 
            "style": {
                    "positive": { 
                        "map": zeroArr,
                        "max": 0
                        }, 
                    "negative": {
                        "map": zeroArr,
                        "min": 0
                        }, 
                    "posCount": { 
                        "map": zeroArr,
                        "max": 0
                        },
                    "negCount": {
                        "map": zeroArr,
                        "min": 0
                        },
                    "bias": {
                        "map": zeroArr,
                        "max": 0
                        }, 
                }, 
        }

        db.products.insert_one(product_info)

    product = db.products.find_one({"product_id": product_info["product_id"]})
    
    # This is a list of reviews
    reviews = data["reviews"]
    for review in reviews:
        review["product_id"] = product["product_id"]
        review["time_recorded"] = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")
        product["reviews_count"] += 1

        # Aggregate the information for the aggregate page
        aggregate_review(review, product)
        db.reviews.insert_one(review)
        
    db.products.replace_one({"product_id": product["product_id"]}, product)

#Not Being Called RN
def get_product_review(data):   
    review_lst = []     
    reviews = db.reviews.find({"product_id": data["product_id"]})    
    for review in reviews:
        review.pop("_id")
        review_lst.append(review)
    
    product = db.products.find_one({"product_id": review["product_id"]})
    
    returnContent = {
        'reviews': review_lst,
        'dimensions': {
            'width': product['imageDimensions']['width'],
            'height': product['imageDimensions']['height'],
            'downscale_factor': product['downscale_factor']
        }
    }

    return returnContent
import numpy as np
def get_product(data):    
    product = db.products.find_one({"product_id": data["product_id"]})    
    product.pop("_id")
    return product


# initialize the accumulative data for a new product, check documentation for data format
def init_acc_data(product_id, width, height):
    data_dic = {}    
    data_dic["reviews_count"] = 0
    data_dic["images"] = {"quality": {"positive": [0]*width*height, "negative": [0]*width*height}, "fit": {"positive": [0]*width*height, "negative": [0]*width*height}, "style": {"positive": [0]*width*height, "negative": [0]*width*height}}
    return data_dic
