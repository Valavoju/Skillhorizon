import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# ✅ Load .env variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# ✅ Connect to MongoDB
try:
    client = MongoClient(MONGO_URI)
    db = client["skillhorizon"]  # Change this to your database name
    collection = db["jobs"]  # Change this to your collection name
    print("✅ Successfully connected to MongoDB Atlas!")
except Exception as e:
    print(f"❌ MongoDB connection error: {e}")
    exit()  # Stop execution if connection fails

# ✅ Load JSON File
json_file = "ai_job_description.json"  # Ensure the JSON file is in the same directory
try:
    with open(json_file, "r", encoding="utf-8") as file:
        job_data = json.load(file)  # Load JSON data

    # ✅ Ensure JSON data is a **list of dictionaries**
    if not isinstance(job_data, list):
        print("❌ Error: JSON data must be a list of job records.")
        exit()

    print("📌 Sample Data Loaded:", json.dumps(job_data[:3], indent=2))  # Show first 3 records

    # ✅ Insert Data into MongoDB
    if job_data:
        collection.insert_many(job_data)
        print(f"✅ Successfully inserted {len(job_data)} job listings into MongoDB!")
    else:
        print("⚠️ No data found in JSON file!")

except json.JSONDecodeError:
    print("❌ Error: Invalid JSON format in file!")
except Exception as e:
    print(f"❌ Error inserting data into MongoDB: {e}")
