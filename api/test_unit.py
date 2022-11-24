import pytest
from dataAnalyzer import aggregate_image, aggregate_review
import json

def test_image_aggregate():
    #Adding a 2x2 array residing in the bot right corner of a 3x3 array 
    aggr_array = [1]*9
    image_array = [2]*4
    dimensions = {"width": 3, "height": 3}
    img_weight = 2
    bbox = {"xMin": 1, "xMax": 2, "yMin": 1, "yMax": 2}
    aggregate_image(aggr_array, dimensions,image_array, img_weight, bbox)
    assert aggr_array == [1, 1, 1, 1, 5, 5, 1, 5, 5]

def test_aggregate_review():
    mock_product = json.load(open('api/mock_product.json'))
    mock_review = json.load(open('api/mock_review.json'))
    aggregate_review(mock_review, mock_product)    
    assert mock_product["images"]["quality"]["positive"] == [0, 1, 1, 0]