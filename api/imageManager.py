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
        
        width = product_info["imageDimensions"]["width"]//product_info["downscale_factor"]
        height = product_info["imageDimensions"]["height"]//product_info["downscale_factor"]
        product_info["reviews_count"] = 0
        product_info["images"] = {"quality": {"positive": [0]*width*height, "negative": [0]*width*height}, "fit": {"positive": [0]*width*height, "negative": [0]*width*height}, "style": {"positive": [0]*width*height, "negative": [0]*width*height}}

        db.products.insert_one(product_info)

    product = db.products.find_one({"product_id": product_info["product_id"]})
    
    #This is a list of reviews
    reviews = data["reviews"]
    for review in reviews:
        review_id = review["review_id"]
        review["product_id"] = product["product_id"]
        review["time_recorded"] = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")
        if db.reviews.find_one({"review_id": review_id}) == None:
            db.reviews.insert_one(review)
        aggregate_review(review, product)        
        db.products.replace_one({"product_id": product["product_id"]}, product)

def get_product_review(data):   
    review_lst = []     
    reviews = db.reviews.find({"product_id": data["product_id"]})    
    for review in reviews:
        review.pop("_id")
        review_lst.append(review)
    return review_lst

# initialize the accumulative data for a new product, check documentation for data format
def init_acc_data(product_id, width, height):
    data_dic = {}    
    data_dic["reviews_count"] = 0
    data_dic["images"] = {"quality": {"positive": [0]*width*height, "negative": [0]*width*height}, "fit": {"positive": [0]*width*height, "negative": [0]*width*height}, "style": {"positive": [0]*width*height, "negative": [0]*width*height}}
    return data_dic
