import pymavlink
import serial.tools.list_ports
import time
import socket
from pymavlink import mavutil
import re


class Link:

    def __init__(self):
        self.droneList = []
        self.droneCnt = 0
        self.Refresh()
    
    def Refresh(self):
        self.droneList = Link.EstablishConn()
        self.droneCnt = len(self.droneList)
        
    def DelLink(self, id):
        self.droneList[id].close()
        self.droneList.pop(id)
        
    def AddLink(self, conn_str):
        if Link.CheckConnHealth(conn_str) != -1:
            temp_conn = mavutil.mavlink_connection(conn_str,baud=57600,wait=4)
            self.droneList.append(temp_conn)
        else:
            print("Invalid Connection")

    def GetSer(hwid):
        pattern = r'SER=([A-Fa-f0-9]+)'
        match = re.search(pattern, hwid)
        if match:
            usbser = match.group(1)
            return str(usbser)

    def CheckAvailableSerial():
    #RETURNS AVAILABLE serial ports
        ports = serial.tools.list_ports.comports()
        uniqueports = []
        for port in sorted(ports):
            usbser = Link.GetSer(str(port.hwid))
            if len(uniqueports) == 0:
               uniqueports.append(port)
            else:
                flg = False
                for uport in uniqueports:
                    temp = Link.GetSer(str(uport.hwid))
                    if  temp == usbser:
                        flg=False
                        break
                    else:
                        flg = True
                if flg:
                    uniqueports.append(port)
                    flg = False
    

        return uniqueports


    
    def CheckAvailableTCP():
    #returns avilable Tcp ports


        return []

    def CheckAvailableUDP():
    #returns available Udp ports

        return []

    def CheckAvailableOther():
    #for other connections
        return []

    def CheckAvailablePorts():
    #returns all drones online
        available = []
        available = Link.CheckAvailableSerial()
        available += Link.CheckAvailableTCP()
        available += Link.CheckAvailableUDP()
        available += Link.CheckAvailableOther()
        online = []
        for port in available:
            
            try:
                # Try connecting to the port and listen for MAVLink heartbeat
                latency = Link.CheckConnHealth(str(port.device))
                if latency != -1.0:
                    print(f"Drone is connected to port: {port.device}")
                    print(f"Connection latency: {latency * 1000.0}ms")
                    online.append(port.device)
                else:
                    print(f"Connection latency: {latency}")
            except Exception as e:
                print(f"No heartbeat received or connection error: {e}")
        return online
       
    def send_heartbeat(mav):
        mav.mav.heartbeat_send(
        mavutil.mavlink.MAV_TYPE_GENERIC,
        mavutil.mavlink.MAV_AUTOPILOT_INVALID,
        mavutil.mavlink.MAV_MODE_MANUAL_ARMED,
        0, 0
        )
    def CheckConnHealth(conn_str):
    # Send heartbeat and measure time until response is received
   
        mav = mavutil.mavlink_connection(conn_str, baud=57600, timeout=4)
        Link.send_heartbeat(mav)
    
        start_time = time.time()

        while True:
            msg = mav.recv_match(type='HEARTBEAT', blocking=True, timeout=4)
            if msg:
                end_time = time.time()
                latency = end_time - start_time
                print(f"Round-trip time: {latency:.6f} seconds")
                return latency
            else:
                return -1
            
    def EstablishConn():
        online = Link.CheckAvailablePorts()
        
        droneDict = []
        cnt = 1
        for port in online:
            temp_conn = mavutil.mavlink_connection(port, baud=57600, timeout=4)
            droneDict.append(temp_conn)
            cnt+=1
        return droneDict
    
