from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
import PyPDF2
import docx

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure MongoDB Atlas connection
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.get_database()

# MongoDB Collections
users_collection = db.users
upload_collection = db.resumes

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

# 🔹 User Sign-Up Route
@app.route("/sign_up", methods=["POST"])
def sign_up():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400

    # Check if user already exists
    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 400

    # Hash the password before storing it
    hashed_password = generate_password_hash(password)

    # Save user to database
    user_data = {
        "name": name,
        "email": email,
        "password": hashed_password
    }
    users_collection.insert_one(user_data)

    return jsonify({"message": "User registered successfully!"}), 201

# 🔹 User Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Fetch user from database
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Check if password matches
    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid password"}), 400

    # Create JWT Token
    access_token = create_access_token(identity=email)
    return jsonify({"message": "Login successful", "access_token": access_token}), 200


# 🔹 Protected Route (Requires JWT)
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify({"message": "This is a protected route!"})

@app.route("/upload", methods=["POST"])
def upload():
    try:
        if "upload" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["upload"]
        file_ext = file.filename.split(".")[-1].lower()

        if file_ext not in ["pdf", "docx"]:
            return jsonify({"error": "Only PDF and DOCX files are allowed"}), 400

        extracted_text = ""

        # Extract text based on file type
        if file_ext == "pdf":
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                extracted_text += page.extract_text() + "\n"

        elif file_ext == "docx":
            doc = docx.Document(file)
            extracted_text = "\n".join([para.text for para in doc.paragraphs])

        # Prepare data to be stored in MongoDB
        upload_data = {
            "file_name": file.filename,
            "content": extracted_text,
        }

        # Store extracted content and file name in MongoDB
        upload_collection.insert_one(upload_data)

        return jsonify({"message": "File uploaded and stored successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🔹 Resume Upload and Extraction Route
@app.route('/extract-text', methods=['POST'])
@jwt_required()
def extract_text():
    try:
        if 'resume' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['resume']
        file_ext = file.filename.split('.')[-1].lower()

        if file_ext not in ['pdf', 'docx']:
            return jsonify({"error": "Only PDF and DOCX files are supported"}), 400

        extracted_text = ""

        if file_ext == 'pdf':
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                extracted_text += page.extract_text() + "\n"

        elif file_ext == 'docx':
            doc = docx.Document(file)
            extracted_text = "\n".join([para.text for para in doc.paragraphs])

        return jsonify({"message": "Text extracted successfully", "extractedText": extracted_text}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
