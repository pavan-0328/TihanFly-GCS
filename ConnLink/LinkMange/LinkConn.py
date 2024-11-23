import pymavlink
import serial.tools.list_ports
import time
import socket
from pymavlink import mavutil
from pymavlink.dialects.v20 import ardupilotmega as mavlink

import re

class UDP:

    def get_local_ip():
        hostname = socket.gethostname()
        localip = socket.gethostbyname(hostname)
        return localip

    def __init__(self):
        self.udp_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        ip = UDP.get_loca_ip()
        self.udp_sock.bind((ip, 14550))
        self.availConn = {}

    def checkOnline(self):
        pass


class Link:

    def __init__(self):
        self.droneList = {}
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
            self.droneList[self.droneCnt+1] = temp_conn
            self.droneCnt+=1
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
        udp_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        target_ip = "192"
        target_port = 8080

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
        
        droneDict = {}
        cnt = 1
        for port in online:
            temp_conn = mavutil.mavlink_connection(port, baud=57600, timeout=4)
            droneDict[cnt] = temp_conn
            cnt+=1
        return droneDict
    
class DroneUtil:

    def __init__(self):
        self.flightModes = {
        'MODE_STABILIZE': 'STABILIZE',
        'MODE_ACRO': 'ACRO',
        'MODE_ALTHOLD': 'ALT_HOLD',
        'MODE_AUTO': 'AUTO',
        'MODE_GUIDED': 'GUIDED',
        'MODE_LOITER': 'LOITER',
        'MODE_RTL': 'RTL',
        'MODE_CIRCLE': 'CIRCLE',
        'MODE_POSITION': 'POSITION',
        'MODE_LAND': 'LAND',
        'MODE_OF_LOITER': 'OF_LOITER',
        'MODE_DRIFT': 'DRIFT',
        'MODE_SPORT': 'SPORT',
        'MODE_FLIP': 'FLIP',
        'MODE_AUTOTUNE': 'AUTOTUNE',
        'MODE_POSHOLD': 'POSHOLD',
        'MODE_BRAKE': 'BRAKE',
        'MODE_THROW': 'THROW',
        'MODE_AVOID_ADSB': 'AVOID_ADSB',
        'MODE_GUIDED_NOGPS': 'GUIDED_NOGPS',
        'MODE_SMART_RTL': 'SMART_RTL',
        'MODE_FLOWHOLD': 'FLOWHOLD',
        'MODE_FOLLOW': 'FOLLOW',
        'MODE_ZIGZAG': 'ZIGZAG',
        'MODE_SYSTEMID': 'SYSTEMID',
        'MODE_AUTOROTATE': 'AUTOROTATE',
        'MODE_AUTO_RTL': 'AUTO_RTL'
        }   

    def arm(self,vehicle):
        vehicle.mav.command_long_send(
            vehicle.target_system,    # Target system ID
            vehicle.target_component, # Target component ID
            mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM, # Command to arm/disarm
            0,    # Confirmation (0 = no confirmation)
            1,    # First param: 1 to arm, 0 to disarm
            0, 0, 0, 0, 0, 0  # Unused parameters
        )

        #vehicle.motors_armed_wait()
        
        return 200
    
    def disarm(self,vehicle):
        vehicle.mav.command_long_send(
            vehicle.target_system,    # Target system ID
            vehicle.target_component, # Target component ID
            mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM, # Command to arm/disarm
            0,    # Confirmation (0 = no confirmation)
            0,    # First param: 1 to arm, 0 to disarm
            0, 0, 0, 0, 0, 0  # Unused parameters
        )
        return 200
    
    def takeoff(self,vehicle,alt):
        mode = 'GUIDED'
        if self.changemode(vehicle=vehicle,mode=mode) != 200:
            return 400
        self.arm(vehicle=vehicle)
        alt = float(alt)
        vehicle.mav.command_long_send(
            vehicle.target_system,    # Target system
            vehicle.target_component, # Target component
            mavutil.mavlink.MAV_CMD_NAV_TAKEOFF, # Takeoff command
            0,    # Confirmation
            0,    # Param 1 (min pitch angle)
            0, 0, 0, 0, 0,  # Param 2-6 (unused)
            alt  # Param 7: Desired takeoff altitude in meters
        )

        while True:
            altitude_msg = vehicle.recv_match(type='GLOBAL_POSITION_INT', blocking=True)
            if altitude_msg and altitude_msg.relative_alt >= alt * 1000:  # Altitude is in millimeters
                print(f"Reached target altitude of {alt} meters!")
                return 200
        return 400
    
    def changemode(self,vehicle,mode):
        if mode in self.flightModes.values():
            vehicle.set_mode(mode)
            while True:
                msg = vehicle.recv_match(type='HEARTBEAT', blocking=True)
                current_mode = msg.custom_mode
                if current_mode == 0:
                    print(f"Mode successfully changed to {mode}")
                    break
            return 200
    
    def getlocation(self,vehicle):
        msg = vehicle.recv_match(type='GLOBAL_POSITION_INT', blocking=True)
        time.sleep(4)
        lat = msg.lat / 1e7  # Latitude in degrees
        lon = msg.lon / 1e7  # Longitude in degrees
        alt = msg.relative_alt / 1000.0  # Altitude above ground in meters (millimeters to meters)
        print(lat,lon,alt)
        return {"lat": lat,"lon" : lon,"alt": alt}
        
    def upload_waypoints(self,vehicle,points):
        wp = mavlink.MAVLink_mission_item_message
        mission = []
        mlen = len(points)
        for i in range(1,mlen+1):
            point = points[i]
            mission.append(wp(vehicle.target_system, vehicle.target_component, i,
                       mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT,
                       mavutil.mavlink.MAV_CMD_NAV_WAYPOINT,
                       2,  # current and autocontinue
                       0,  # no hold
                       point["alt"],  # altitude
                       points['lat'],  # latitude
                       points['lon'],  # longitude
                       0, 0, 0, 0))
        for m in mission:
            vehicle.mav.send(m)
            time.sleep(0.5)
