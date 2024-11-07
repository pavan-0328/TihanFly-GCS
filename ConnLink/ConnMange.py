from flask import Flask,jsonify
from flask_cors import CORS
from LinkMange.LinkConn import Link
from markupsafe import escape

avail_conn = Link()
app = Flask(__name__)

@app.route('/module/',methods=['GET'])
def available_conn():
    avail_conn.Refresh()
    return str(avail_conn.droneCnt)

@app.route('/module/arm/<int:drone_id>',methods=['GET'])
def arm(drone_id):
    return str(drone_id)


@app.route('/module/disarm/<int:drone_id>',methods=['GET'])
def disarm(drone_id):
    return str(drone_id)

@app.route('/module/takeoff/<int:drone_id>',methods=['POST','GET'])
def takeoff(drone_id):
    return str(drone_id)

@app.route('/module/land/<int:drone_id>',methods=['GET'])
def land(drone_id):
    return str(drone_id)

@app.route('/module/get-location/<int:drone_id>',methods=['GET'])
def getlocation(drone_id):
    return str(drone_id)

@app.route('/module/change-mode/<int:drone_id>',methods=['POST','GET'])
def changemode(drone_id):
    return str(drone_id)


if __name__=='__main__':
    app.run()