"""
Code to load tracts from the database. Sort of a model layer, though this code clearly isn't adhering to strict MVC. (In a real app we'd probably want to go with whatever architecture is idiomatic to Flask, assuming that makes sense for the app.)
"""
import base64
import sqlite3

from db import get_connection, select_all, select_one


def get_tracts():
    """
    Get the list of tracts from the database. This could use more love (modeling Tract properly, turning this list into a list of Tracts, handling the database abstraction better, etc.).
    """
    rows = select_all(
        "SELECT fid, statefp, countyfp, tractce, geoid, name, namelsad, mtfcc, funcstat, aland, awater, intptlat, intptlon FROM tracts"
    )

    def row_to_tract(row):
        """
        Little helper function to parse the response.
        """
        return {
            "fid": row[0],
            "statefp": row[1],
            "countyfp": row[2],
            "tractce": row[3],
            "geoid": row[4],
            "name": row[5],
            "namelsad": row[6],
            "mtfcc": row[7],
            "funcstat": row[8],
            "aland": row[9],
            "awater": row[10],
            "intptlat": row[11],
            "intptlon": row[12],
        }

    tracts = [row_to_tract(row) for row in rows]

    return tracts


def get_tract_detail(fid):
    """
    Get full details for the specified tract. Same improvements mentioned above apply here.

    Parameters:
        - fid: int, primary key for the tract
    """
    tract = select_one(
        "SELECT fid, geom, statefp, countyfp, tractce, geoid, name, namelsad, mtfcc, funcstat, aland, awater, intptlat, intptlon FROM tracts WHERE fid = ?",
        (fid,),
    )

    return {
        "fid": tract[0],
        "geom": base64.b64encode(tract[1]).decode(
            "ascii"
        ),  # Base-64 encoding because bytes aren't JSON serializable
        "statefp": tract[2],
        "countyfp": tract[3],
        "tractce": tract[4],
        "geoid": tract[5],
        "name": tract[6],
        "namelsad": tract[7],
        "mtfcc": tract[8],
        "funcstat": tract[9],
        "aland": tract[10],
        "awater": tract[11],
        "intptlat": tract[12],
        "intptlon": tract[13],
    }
