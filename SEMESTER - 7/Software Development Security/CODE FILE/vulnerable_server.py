# vulnerable_server.py
import socket

# Creation of a simple TCP server
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("127.0.0.1", 9999))
server.listen(5)

print("Server started on port 9999... Waiting for connections.")

while True:
    client, addr = server.accept()
    print(f"Connection established with {addr}")
    client.send(b"Hello! You are connected to the server.\n")
    client.close()