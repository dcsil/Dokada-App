
#Mutate aggregates in product_data with the review data
def aggregate_review(review, product_data):    
    #product_data = db.aggregates.find_one({"product_id": review["product_id"]})
    product_images = product_data["images"]
    downscaled_dimensions = {"width": product_data["imageDimensions"]["width"]//product_data["downscale_factor"], "height": product_data["imageDimensions"]["height"]//product_data["downscale_factor"]}
    
    for layer in review["layers"]:
        for weight_category in layer["weights"]:
            weight = layer["weights"][weight_category]
            """
            aggr_images[weight_category] has two keys, "positive" and "negative", which stores
            pixels that has positive or negative weights in each category
            """ 
            if(weight > 0):
                aggregate_image(product_images[weight_category]["positive"], downscaled_dimensions, layer["imageData"]["image"], weight, layer["imageData"]["bbox"])
            elif(weight < 0):
                aggregate_image(product_images[weight_category]["negative"], downscaled_dimensions, layer["imageData"]["image"], weight, layer["imageData"]["bbox"])
    

#Mutates the aggregate array to add the image array * img_weight in each entry only for the specified range in bbox
def aggregate_image(aggr_array, dimensions, image_array, img_weight, bbox):            
    for x_coord in range(bbox["xMin"], bbox["xMax"]+1):
        for y_coord in range(bbox["yMin"], bbox["yMax"]+1):
            img_x_coord = x_coord - bbox["xMin"]
            img_y_coord = y_coord - bbox["yMin"]
            image_width = bbox["xMax"] - bbox["xMin"] + 1           
            image_index = img_y_coord*image_width + img_x_coord
            aggregate_index = y_coord * dimensions["width"] + x_coord
            print(f'x: {x_coord}, y: {y_coord}, index: {aggregate_index}, imgX: {img_x_coord}, imgY: {img_y_coord}, imgIndex: {image_index}')
            aggr_array[aggregate_index] += img_weight*image_array[aggregate_index]