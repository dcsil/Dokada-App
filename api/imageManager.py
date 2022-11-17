from .db import getClient
db = getClient()
def store_reviews(data):
    #data comes in as a dictionary containing parsed JSON, check documentations for the format of this request
    
    print(data)
    product_info = data["product_info"]
    
    #save the product's information if not found in db
    if db.products.find_one({"product_id": product_info["product_id"]}) == None:
        db.products.insert_one(product_info)

    #This is a list of reviews
    reviews = data["reviews"]
    for review in reviews:
        review_id = review["review_id"]
        review["product_id"] = product_info["product_id"]
        if db.reviews.find_one({"review_id": review_id}) == None:
            db.reviews.insert_one(review)

   
