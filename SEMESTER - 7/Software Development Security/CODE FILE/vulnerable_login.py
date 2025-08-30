# vulnerable_login.py
import sqlite3

# Database Connection
conn = sqlite3.connect("users.db")
cursor = conn.cursor()

# Creates users table if not exists
cursor.execute("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)")
cursor.execute("DELETE FROM users")  # reset table
cursor.execute("INSERT INTO users VALUES ('admin', 'admin123')")
cursor.execute("INSERT INTO users VALUES ('user', 'user123')")
conn.commit()

# User Input
username = input("Enter Username: ")
password = input("Enter Password: ")

# Vulnerable Query
query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "';"
print("Executing Query:", query)

cursor.execute(query)
result = cursor.fetchall()

if result:
    print("Login Successful")
else:
    print("Login Failed")