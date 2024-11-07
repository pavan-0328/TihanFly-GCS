from flask import Flask,jsonify
from flask_cors import CORS
from LinkMange.LinkConn import Link

avail_conn = Link()
app = Flask(__name__)

@app.route('/module/conn',methods=['GET'])
def available_conn():
    avail_conn.Refresh()
    return str(avail_conn.droneCnt)

if __name__=='__main__':
    app.run()