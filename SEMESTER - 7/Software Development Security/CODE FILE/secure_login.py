# secure_login.py
import sqlite3

# Database Connection
conn = sqlite3.connect("users.db")
cursor = conn.cursor()

# User Input
username = input("Enter username: ")
password = input("Enter password: ")

# Secure Query using Parameterized Statements
query = "SELECT * FROM users WHERE username = ? AND password = ?"
print("Executing Secure Query with Parameters")

cursor.execute(query, (username, password))
result = cursor.fetchall()

if result:
    print("Login Successful")
else:
    print("Login Failed")