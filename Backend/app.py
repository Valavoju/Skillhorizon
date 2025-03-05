from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
from Database.db_connection import db  # Import the connected database

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def home():
    return "Welcome to Skill Horizon Backend!"

@app.route("/add_user")
def add_user():
    user_data = {"name": "Avinash", "email": "avinash@example.com"}
    db.users.insert_one(user_data)  # Insert into "users" collection
    return jsonify({"message": "User added successfully!"})

@app.route("/get_users")
def get_users():
    users = list(db.users.find({}, {"_id": 0}))  # Retrieve users without `_id`
    return jsonify(users)

if __name__ == "__main__":
    app.run(debug=True)
