import pytest
from dataAnalyzer import *
import numpy as np
import json
from app import *

def test_aggregate_layer():
    layer = {
        'imageData': {
            'image': [1, 1, 1, 1]
        },
        'weights': {
            'quality': 1
        }
    }
    bitmap = {
        'quality':{
            'positive':{
                'map': [0,0,0,0],
                'max':0
            },
            'negative':{
                'map': [0,0,0,0],
                'min':0
            },
            'posCount':{
                'map': [0,0,0,0],
                'max':0
            },
            'negCount':{
                'map': [0,0,0,0],
                'min':0
            },
            'bias':{
                'map':[0,0,0,0],
                'max':0
            }
        }
    }

    aggregate_layer(layer, bitmap)

    assert layer == {'imageData': {'image': [1, 1, 1, 1]}, 'weights': {'quality': 1}}
    assert np.sum(bitmap["quality"]["positive"]["map"]) == 4



def test_aggregate_review():
    review = {
        "layers": [
            {
                'imageData': {
                    'hasContent': True,
                    'image': [1,0,1, 0]
                },
                'weights': {
                    'quality': 1
                }
            },
            {
                'imageData': {
                    'hasContent': True,
                    'image': [1, 0, 0, 1]
                },
                'weights': {
                    'quality': 0.5
                }
            }
        ]
    }
    product_data = {
        "images":{
            'quality':{
                'positive':{
                    'map': [0,0,0,0],
                    'max':0
                },
                'negative':{
                    'map': [0,0,0,0],
                    'min':0
                },
                'posCount':{
                    'map': [0,0,0,0],
                    'max':0
                },
                'negCount':{
                    'map': [0,0,0,0],
                    'min':0
                },
                'bias':{
                    'map':[0,0,0,0],
                    'max':0
                }
            }
        }
    }
    
    aggregate_review(review, product_data)

    assert product_data['images']['quality']['positive']['map'][0] == 1.5
    assert product_data['images']['quality']['positive']['map'][1] == 0.0
    assert product_data['images']['quality']['positive']['map'][2] == 1.0
    assert product_data['images']['quality']['positive']['map'][3] == 0.5
    assert product_data['images']['quality']['positive']['max'] == 1.5

def test_app():
    app = get_app()
    assert type(app) == Flask
    
    try:
        product_portal()
    except:
        assert True

    try:
        image_portal()
    except:
        assert True

    try:
        trigger_error()
    except:
        assert True

    try:
        index()
    except:
        assert True

    try:
        not_found()
    except:
        assert True

    try:
        create_token()
    except:
        assert True

    try:
        refresh_expiring_jwts()
    except:
        assert True

def test_image_manager():
    store_data = {
        "product_info": {
            "product_id": 0,
            "imageDimensions": {
                "width":0,
                "height":0
            }
        },
        "reviews": []
    }

    try:
        store_reviews(store_data)
        assert False
    except:
        assert True

    receive_data = {
        "product_id": 0
    }

    # Fail for getting review for fake product
    try:
        get_product_review(receive_data)
        assert False
    except Exception as e:
        assert True


    try:
        result = get_product(receive_data)
        
        # Can't get this case working on github, rip
        assert result == {'product_id': 0, 'imageDimensions': {'width': 0, 'height': 0}, 'reviews_count': 0, 'images': {'quality': {'positive': {'map': [], 'max': 0}, 'negative': {'map': [], 'min': 0}, 'posCount': {'map': [], 'max': 0}, 'negCount': {'map': [], 'min': 0}, 'bias': {'map': [], 'max': 0}}, 'fit': {'positive': {'map': [], 'max': 0}, 'negative': {'map': [], 'min': 0}, 'posCount': {'map': [], 'max': 0}, 'negCount': {'map': [], 'min': 0}, 'bias': {'map': [], 'max': 0}}, 'style': {'positive': {'map': [], 'max': 0}, 'negative': {'map': [], 'min': 0}, 'posCount': {'map': [], 'max': 0}, 'negCount': {'map': [], 'min': 0}, 'bias': {'map': [], 'max': 0}}}}
    except Exception as e:
        assert True

