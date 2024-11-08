from flask import Flask,jsonify, request
from flask_cors import CORS
from LinkMange.LinkConn import Link,DroneUtil
from markupsafe import escape

avail_conn = Link()
drone_util = DroneUtil()
app = Flask(__name__)

@app.route('/module/',methods=['GET'])
def available_conn():
    avail_conn.Refresh()
    return str(avail_conn.droneCnt)

@app.route('/module/arm/<int:drone_id>',methods=['GET'])
def arm(drone_id):
    drone_util.arm(avail_conn.droneList[drone_id])
    return jsonify({"status": "Armed Successfully"}),200


@app.route('/module/disarm/<int:drone_id>',methods=['GET'])
def disarm(drone_id):
    drone_util.disarm(avail_conn.droneList[drone_id])
    return 200

@app.route('/module/takeoff/<int:drone_id>',methods=['POST','GET'])
def takeoff(drone_id):
    data = request.get_json()
    drone_util.takeoff(avail_conn.droneList[drone_id],data.get('Alt'))
    return 200

@app.route('/module/land/<int:drone_id>',methods=['GET'])
def land(drone_id):
    drone_util.changemode(avail_conn.droneList[drone_id],'LAND')
    return 200

@app.route('/module/get-location/<int:drone_id>',methods=['GET'])
def getlocation(drone_id):
    loc = drone_util.getlocation(avail_conn.droneList[drone_id])
    return jsonify(loc)

@app.route('/module/change-mode/<int:drone_id>',methods=['POST','GET'])
def changemode(drone_id):
    data = request.get_json()
    drone_util.changemode(avail_conn.droneList[drone_id],data.get('Mode'))
    return 200


if __name__=='__main__':
    app.run()