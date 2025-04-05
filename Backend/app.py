from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import PyPDF2
import docx

# 🔹 App Initialization
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# ✅ Direct Mongo URI (since .env caused issues)
MONGO_URI = "mongodb+srv://avinashvalavoju:avinash4334@cluster0.pbudvfx.mongodb.net/skillhorizon?retryWrites=true&w=majority"
JWT_SECRET = "f1a3b9d6c8e4f5a7b1d9c0a8e3f4b6c7d9e2a1c5f7d0b3e8a9d4e6c2f8b1a7d3"
app.config["JWT_SECRET_KEY"] = JWT_SECRET

# 🔹 MongoDB Setup
client = MongoClient(MONGO_URI)
db = client["skillhorizon"]
users_collection = db["users"]
upload_collection = db["resumes"]

# ✅ Check MongoDB connection
try:
    client.server_info()
    print("✅ MongoDB connected successfully!")
except Exception as e:
    print("❌ MongoDB connection failed:", e)

# 🔹 JWT Setup
jwt = JWTManager(app)

# 🔹 Routes
@app.route("/")
def home():
    return jsonify({"message": "Welcome to Skill Horizon Backend!"})

@app.route("/signup", methods=["POST"])
def sign_up():
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({"error": "All fields required"}), 400

        if users_collection.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 400

        hashed_password = generate_password_hash(password)
        users_collection.insert_one({
            "name": name, "email": email, "password": hashed_password
        })

        return jsonify({"message": "User registered successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = users_collection.find_one({"email": email})
        if not user or not check_password_hash(user["password"], password):
            return jsonify({"error": "Invalid email or password"}), 401

        token = create_access_token(identity=email)
        return jsonify({"message": "Login successful", "access_token": token}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
            return jsonify({"error": "Only PDF and DOCX allowed"}), 400

        extracted_text = ""
        if file_ext == "pdf":
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                extracted_text += page.extract_text() + "\n"
        elif file_ext == "docx":
            doc = docx.Document(file)
            extracted_text = "\n".join([para.text for para in doc.paragraphs])

        upload_collection.insert_one({
            "file_name": file.filename,
            "content": extracted_text
        })

        return jsonify({"message": "File uploaded and stored successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/extract-text", methods=["POST"])
@jwt_required()
def extract_text():
    try:
        if "resume" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["resume"]
        file_ext = file.filename.split(".")[-1].lower()

        if file_ext not in ["pdf", "docx"]:
            return jsonify({"error": "Only PDF and DOCX supported"}), 400

        extracted_text = ""
        if file_ext == "pdf":
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                extracted_text += page.extract_text() + "\n"
        elif file_ext == "docx":
            doc = docx.Document(file)
            extracted_text = "\n".join([para.text for para in doc.paragraphs])

        return jsonify({"message": "Text extracted successfully", "extractedText": extracted_text}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🔹 Run App
if __name__ == "__main__":
    app.run(debug=True)
