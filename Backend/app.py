from flask import Flask, jsonify, request
from flask_cors import CORS  
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure MongoDB Atlas connection
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.get_database()

# Configure JWT Secret Key
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
jwt = JWTManager(app)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to Skill Horizon Backend!"})

# 🔹 Route to add a user (POST request)
@app.route("/add_user", methods=["POST"])
def add_user():
    try:
        user_data = request.get_json()
        if not user_data or "name" not in user_data or "email" not in user_data:
            return jsonify({"error": "Invalid input, name and email required"}), 400

        db.users.insert_one(user_data)  
        return jsonify({"message": "User added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🔹 Route to get all users
@app.route("/get_users", methods=["GET"])
def get_users():
    try:
        users = list(db.users.find({}, {"_id": 0}))  
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🔹 User Login & JWT Token Generation
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = db.users.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Create JWT Token
    access_token = create_access_token(identity=email)
    return jsonify({"message": "Login successful", "access_token": access_token}), 200

# 🔹 Protected Route (Requires JWT)
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify({"message": "This is a protected route!"})

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
