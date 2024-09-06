import pymavlink
import socket 

udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
udp_socket.bind(('192.168.20.162', 14550))  # Bind to IP and port

while True:
    data,addr= udp_socket.recvfrom(1024)  # Buffer size
    print(addr)
    udp_socket.sendto(b"Hello Pavan", (addr))
    print("Received message:", data)
