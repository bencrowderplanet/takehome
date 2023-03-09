"""
Backend takehome.
"""
from flask import Flask, abort, jsonify
from flask_cors import CORS

from tracts import get_tract_detail, get_tracts

app = Flask(__name__)
CORS(app)


@app.route("/tracts")
def list_tracts():
    """
    Endpoint that returns a list of tracts.
    """
    try:
        tracts = get_tracts()
        return {"tracts": tracts}
    except Exception as e:
        return (
            {
                "error": str(e),
            },
            500,
        )


@app.route("/tracts/<int:fid>")
def get_tract(fid):
    """
    Endpoint that returns details for a specific tract, as specified by `fid`.
    """
    try:
        tract = get_tract_detail(fid)
        return tract
    except Exception as e:
        return (
            {
                "error": str(e),
            },
            500,
        )
