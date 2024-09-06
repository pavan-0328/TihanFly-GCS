from pymavlink import mavutil

conn = mavutil.mavlink_connection("udpout:192.168.20.207:14550")
def send_heartbeat(mav):
        mav.mav.heartbeat_send(
        mavutil.mavlink.MAV_TYPE_GENERIC,
        mavutil.mavlink.MAV_AUTOPILOT_INVALID,
        mavutil.mavlink.MAV_MODE_MANUAL_ARMED,
        0, 0
        )

conn.wait_heartbeat()

print("recived heart beAt")