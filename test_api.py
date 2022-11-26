import pytest
import json
from app import get_app

flask_app = get_app()

def test_home_page_post():    

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as test_client:
        response = test_client.get('/')
        assert response.status_code >= 200 and response.status_code <= 300

"""
def test_store_load_api():
    dataToSend = json.dumps({'product_info': {'product_id': 2, 'imageDimensions': {'width': 12, 'height': 12}}, 'reviews': [{'review_id': 20, 'layers': [{'lines': [{'points': [0, 0], 'strokeWidth': 10}, {'points': [0, 10], 'strokeWidth': 20}], 'imageData': {'image': [0, 1, 1, 0], 'width': 2, 'height': 2, 'bbox': {'xMin': 0, 'yMin': 0, 'xMax': 4, 'yMax': 4}}, 'weights': {'quality': 1, 'style': 0, 'fit': 0}}]}]})
    
    with flask_app.test_client() as test_client:
        response = test_client.post('/image-api', json=dataToSend)
        assert response.status_code == 200
"""