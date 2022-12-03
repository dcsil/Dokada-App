import numpy as np

def aggregate_layer(layer, bitmaps):

    weights = layer['weights']
    imageData = layer['imageData']
    # print(weights.keys())
    # print(imageData.keys())
    # print(bitmaps)
    npImage = np.array(imageData["image"])

    for weightType in weights:
        productBitmap = bitmaps[weightType]
        weightVal = weights[weightType]
        # print(weightType, weightVal)
        if weightVal:
            weightedImage = npImage * weightVal
            # print(np.sum(weightedImage))
            if weightVal > 0:
                productBitmap["positive"] = productBitmap["positive"] + weightedImage
                productBitmap["posCount"] = productBitmap["posCount"] + npImage
            elif weightVal < 0:
                productBitmap["negative"] = productBitmap["negative"] + weightedImage
                productBitmap["negCount"] = productBitmap["negCount"] + npImage

#Mutate aggregates in product_data with the review data
def aggregate_review(review, product_data):    
    #product_data = db.aggregates.find_one({"product_id": review["product_id"]})
    product_images = product_data["images"]

    # Convert bitmaps in the product object to Numpy arrays
    for weighting in product_images:
        for bitmap in product_images[weighting]:
            product_images[weighting][bitmap] = np.array(product_images[weighting][bitmap])

    # Aggregate the info based on the layers in the review
    for layer in review["layers"]:
        if 'hasContent' in layer['imageData'] and layer['imageData']['hasContent'] is True:
            aggregate_layer(layer, product_images)
    
    # Do update calculations that aren't done during aggregation
    calculate_bias(product_images)

    # Convert the Numpy arrays into the proper array
    for weighting in product_images:
        for bitmap in product_images[weighting]:
            product_images[weighting][bitmap] = product_images[weighting][bitmap].tolist()
            
            # These logging and writing functions are really useful if you need to debug the contents of the layers
            #print(weighting, bitmap, np.sum(product_images[weighting][bitmap]))
            #np.savetxt(weighting + bitmap + 'data.csv', product_images[weighting][bitmap], delimiter='.')
    

def calculate_bias(bitmaps):

    # f(|x|,|y|) = 1 - |x - y|/|x + y|
    def get_bias(A, B):
        x = np.abs(A)
        y = np.abs(B)
        numerator = np.abs(x - y)
        denominator = np.abs(x + y)
        return 1.0 - np.divide(numerator, denominator, out=np.zeros_like(numerator), where=denominator!=0, casting="unsafe")


    for weightType in bitmaps:
        weightMap = bitmaps[weightType]

        # Weightless bias calculation
        # inverseBias = get_bias(weightMap["posCount"], weightMap["negCount"])

        # Weight considerate bias calculation, negative must be second argument
        inverseBias = get_bias(weightMap["positive"], weightMap["negative"])

        weightMap["bias"] = inverseBias
    
    return 0