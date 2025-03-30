import os
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename
from Backend.Database.db_connection import get_database
from Backend.NLP.text_extraction import process_resume
from Backend.NLP.job_matching import match_resume_with_jobs
from Backend.NLP.learning_path import get_learning_recommendations

app = Flask(__name__)

# MongoDB Connection
db = get_database()
resume_collection = db["resumes"]

# File upload configuration
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"pdf", "docx", "txt"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload_resume", methods=["POST"])
def upload_resume():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        # Extract text from the resume
        extracted_data = process_resume(filepath)

        # Store extracted data in MongoDB
        resume_id = resume_collection.insert_one({"filename": filename, "extracted_data": extracted_data}).inserted_id

        return jsonify({"message": "Resume uploaded successfully", "resume_id": str(resume_id)})

    return jsonify({"error": "File type not allowed"}), 400

@app.route("/match_jobs/<resume_id>", methods=["GET"])
def match_jobs(resume_id):
    results = match_resume_with_jobs(resume_id)
    return jsonify(results)

@app.route("/recommend_skills", methods=["POST"])
def recommend_skills():
    data = request.json
    missing_skills = data["missing_skills"]
    recommendations = get_learning_recommendations(missing_skills)
    return jsonify({"recommendations": recommendations})

if __name__ == "__main__":
    app.run(debug=True)
