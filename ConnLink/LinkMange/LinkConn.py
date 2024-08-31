import pymavlink
import serial.tools.list_ports
import time
from pymavlink import mavutil
import re

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
        usbser = GetSer(str(port.hwid))
        if len(uniqueports) == 0:
            uniqueports.append(port)
        else:
            flg = False
            for uport in uniqueports:
                temp = GetSer(str(uport.hwid))
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

    pass

def CheckAvailableUDP():
    #returns available Udp ports

    pass

def CheckAvailableOther():
    #for other connections
    pass

def CheckAvailablePorts():
    #returns all drones online
    available = []
    available = CheckAvailableSerial()
    
    for port in available:
        print(port.device)
        try:
            # Try connecting to the port and listen for MAVLink heartbeat
            latency = CheckConnHealth(port)
            if latency != -1.0:
                print(f"Drone is connected to port: {port.device}")
                print(f"Connection latency: {latency * 1000.0}ms")
            else:
                print(f"Connection latency: {latency}")
        except Exception as e:
            print(f"No heartbeat received or connection error: {e}")
       
def send_heartbeat(mav):
    mav.mav.heartbeat_send(
        mavutil.mavlink.MAV_TYPE_GENERIC,
        mavutil.mavlink.MAV_AUTOPILOT_INVALID,
        mavutil.mavlink.MAV_MODE_MANUAL_ARMED,
        0, 0
    )

def armDrone(port):
    connection = mavutil.mavlink_connection(port.device, baud=57600, timeout=4)
    connection.mav.command_long_send(
    connection.target_system,
    connection.target_component,
    mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,
    0,
    1, 0, 0, 0, 0, 0, 0)

    connection.motors_armed_wait()

    time.sleep(4)
    print("Armed")

def CheckConnHealth(port):
    # Send heartbeat and measure time until response is received
    armDrone(port)
    mav = mavutil.mavlink_connection(port.device, baud=57600, timeout=4)
    send_heartbeat(mav)
    
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
    pass

CheckAvailablePorts()


