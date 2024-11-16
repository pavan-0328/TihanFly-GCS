from flask import Flask,jsonify, request
from flask_cors import CORS
from LinkMange.LinkConn import Link,DroneUtil
from markupsafe import escape

avail_conn = Link()
drone_util = DroneUtil()
droneList = {
        1: {'id': 1,'loc': {'lon': 78.126737,
        'lat': 17.6017851,
        'alt': 10}},
        2: {'id': 2,'loc': {'lon': 78.126767,
        'lat': 17.6017881,
        'alt': 10}},
        3: {'id': 3,'loc': {'lon': 78.126797,
        'lat': 17.6017951,
        'alt': 10}}
}
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
@app.route('/api/hi',methods=['GET'])
def available_conn():
    avail_conn.Refresh()
    return jsonify({"DroneKeys": list(droneList.keys())}), 200

@app.route('/api/get-location/<int:drone_id>',methods=['GET'])
def getlocation(drone_id):
    return jsonify(droneList[drone_id]),200

if __name__=='__main__':
    app.run()