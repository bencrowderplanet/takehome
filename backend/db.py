"""
A crude abstraction for the database layer. In a real app we'd use something more robust.
"""
import sqlite3


def get_connection():
    """
    Return the database connection. In a real app we'd probably want a pool of connections (and, depending on usage, would need to consider sharding and other techniques for scaling the database layer).
    """
    conn = sqlite3.connect("tracts.gpkg")
    return conn


def select_one(query, params=()):
    """
    Makeshift database abstraction to select one row from the database.
    """
    with get_connection() as conn:
        cur = conn.cursor()
        cur.execute(query, params)
        row = cur.fetchone()

    return row


def select_all(query, params=()):
    """
    Makeshift database abstraction to select all returned rows from the database.
    """
    with get_connection() as conn:
        cur = conn.cursor()
        cur.execute(query, params)
        rows = cur.fetchall()

    return rows
