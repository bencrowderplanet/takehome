import json
from unittest.mock import patch

from main import app  # Flask instance of the API


@patch("main.get_tracts")
def test_list_tracts_route(mock_get_tracts):
    get_tracts_response = [
        {
            "fid": 1,
            "statefp": "27",
            "countyfp": "067",
            "tractce": "781200",
            "geoid": "27067781000",
            "name": "7810",
            "namelsad": "Census Tract 7810",
            "mtfcc": "G5020",
            "funcstat": "S",
            "aland": 7126802,
            "awater": 0,
            "intptlat": "+45.1128783",
            "intptlon": "-095.0257519",
        },
    ]

    mock_get_tracts.return_value = get_tracts_response

    response = app.test_client().get("/tracts")

    assert response.status_code == 200
    assert response.json == {"tracts": get_tracts_response}


@patch("main.get_tract_detail")
def test_list_tracts_route(mock_get_tract_detail):
    get_tract_detail_response = {
        "fid": 1,
        "statefp": "27",
        "countyfp": "067",
        "tractce": "781200",
        "geoid": "27067781000",
        "name": "7810",
        "namelsad": "Census Tract 7810",
        "mtfcc": "G5020",
        "funcstat": "S",
        "aland": 7126802,
        "awater": 0,
        "intptlat": "+45.1128783",
        "intptlon": "-095.0257519",
    }

    mock_get_tract_detail.return_value = get_tract_detail_response

    response = app.test_client().get("/tracts/1")

    assert response.status_code == 200
    assert response.json == get_tract_detail_response
