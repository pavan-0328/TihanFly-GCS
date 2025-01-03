from flask import Flask,jsonify, request
from flask_cors import CORS
from LinkMange.LinkConn import Link,DroneUtil
from markupsafe import escape

avail_conn = Link()
drone_util = DroneUtil()
app = Flask(__name__)
CORS(app)

@app.after_request
def after_request(response):
    # Allow all origins
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    return response

@app.route('/api/hi',methods=['GET'])
def available_conn():
    avail_conn.Refresh()
    return jsonify({"DroneKeys": list(avail_conn.droneList.keys())})

@app.route('/api/add-drone',methods=['POST'])
def addDrone():
    data = request.get_json()
    avail_conn.AddLink(data['connUri'])
    return jsonify({"DroneKeys": list(avail_conn.droneList.keys())}),200

@app.route('/api/arm/<int:drone_id>',methods=['GET'])
def arm(drone_id):
    drone_util.arm(avail_conn.droneList[drone_id])
    return jsonify({"status": "Armed Successfully"}),200


@app.route('/api/disarm/<int:drone_id>',methods=['GET'])
def disarm(drone_id):
    drone_util.disarm(avail_conn.droneList[drone_id])
    return jsonify({"status": "Disarmed Successfully"}),200

@app.route('/api/takeoff/<int:drone_id>',methods=['POST','GET'])
def takeoff(drone_id):
    data = request.get_json()
    drone_util.takeoff(avail_conn.droneList[drone_id],data.get('Alt'))
    return jsonify({"status": f"Takeoff to {data.get('Alt')} initiated Successfully"}),200

@app.route('/api/land/<int:drone_id>',methods=['GET'])
def land(drone_id):
    drone_util.changemode(avail_conn.droneList[drone_id],'LAND')
    return jsonify({"status": "Drone Landing Initiated"}),200

@app.route('/api/get-location/<int:drone_id>',methods=['GET'])
def getlocation(drone_id):
    loc = drone_util.getlocation(avail_conn.droneList[drone_id])
    return jsonify({"id":drone_id,"loc": loc}),200

@app.route('/api/change-mode/<int:drone_id>',methods=['POST','GET'])
def changemode(drone_id):
    data = request.get_json()
    drone_util.changemode(avail_conn.droneList[drone_id],data.get('Mode'))
    
    return jsonify({"status": f"Mode changed to {data.get('Mode')} Successfully"}),200

@app.route('/api/upload-waypoint/<int:drone_id>',methods=['POST','GET'])
def upload_waypoint(drone_id):
    data = request.get_json()
    drone_util.upload_waypoints(data)
    
    return jsonify({"status":"Uploaded success fully"}),200

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5000) 