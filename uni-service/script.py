import mysql.connector
import json

from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

mydb = mysql.connector.connect(
    host="db",
    user="root",
    passwd="admin",
    database="uni_db"
)


def convertResultTableToJson(result_set, cursor):
    row_headers = [x[0] for x in cursor.description]
    json_data = []
    for result in result_set:
        json_data.append(dict(zip(row_headers, result)))
    return json.dumps(json_data)


def getQuery1():
    cursor = mydb.cursor()
    query = '''
        SELECT U.Uni_ID, U.University_Name, P.Professor_Name, G.Publications, G.Citations
        FROM professors P 
        INNER JOIN google_scholar G ON P.Professor_ID = G.Professor_ID
        INNER JOIN universities U ON U.Uni_ID = P.Uni_ID
        WHERE `Publications`>50 AND `Publications`<500
        ORDER BY G.Publications DESC
    '''
    cursor.execute(query)
    rv = cursor.fetchall()
    return convertResultTableToJson(rv, cursor)


def getQuery2():
    cursor = mydb.cursor()
    query = '''
        SELECT U.Uni_ID, U.University_Name, P.Professor_Name, G.Publications, G.Citations
        FROM professors P 
        INNER JOIN google_scholar G ON P.Professor_ID = G.Professor_ID
        INNER JOIN universities U ON U.Uni_ID = P.Uni_ID
        WHERE `Publications`>0
    '''
    cursor.execute(query)
    rv = cursor.fetchall()
    return convertResultTableToJson(rv, cursor)


def getQuery3():
    cursor = mydb.cursor()
    query = '''
        SELECT U.Uni_ID, U.University_Name, P.Professor_Name, G.Publications, G.Citations
        FROM professors P 
        INNER JOIN google_scholar G ON P.Professor_ID = G.Professor_ID
        INNER JOIN universities U ON U.Uni_ID = P.Uni_ID
        WHERE `Publications`=0
    '''
    cursor.execute(query)
    rv = cursor.fetchall()
    return convertResultTableToJson(rv, cursor)


def getQuery4():
    cursor = mydb.cursor()
    query = '''
        SELECT U.Uni_ID, U.University_Name, B.NrOfBacklinks, B.NrOfFiles
        FROM universities U
        INNER JOIN backlinks B ON U.Uni_ID = B.Uni_ID
        ORDER BY B.NrOfBacklinks DESC
    '''
    cursor.execute(query)
    rv = cursor.fetchall()
    return convertResultTableToJson(rv, cursor)


@app.route('/q1')
def route1():
    return getQuery1()


@app.route('/q2')
def route2():
    return getQuery2()


@app.route('/q3')
def route3():
    return getQuery3()


@app.route('/q4')
def route4():
    return getQuery4()


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
