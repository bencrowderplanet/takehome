from unittest.mock import patch

from tracts import get_tract_detail, get_tracts


@patch("tracts.select_all")
def test_get_tracts(mock_select_all):
    mock_select_all.return_value = [
        (
            1,
            "27",
            "067",
            "781200",
            "27067781000",
            "7810",
            "Census Tract 7810",
            "G5020",
            "S",
            7126802,
            0,
            "+45.1128783",
            "-095.0257519",
        )
    ]

    response = get_tracts()
    assert response == [
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
        }
    ]


@patch("tracts.select_one")
def test_get_tracts(mock_select_one):
    # Truncated for test readability. Might be worthwhile to test a full geometry value, though.
    bytes_geom = b"fake geometry"
    geom = "ZmFrZSBnZW9tZXRyeQ=="

    mock_select_one.return_value = (
        1,
        bytes_geom,
        "27",
        "067",
        "781200",
        "27067781000",
        "7810",
        "Census Tract 7810",
        "G5020",
        "S",
        7126802,
        0,
        "+45.1128783",
        "-095.0257519",
    )

    response = get_tract_detail(1)
    assert response == {
        "fid": 1,
        "geom": geom,
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
