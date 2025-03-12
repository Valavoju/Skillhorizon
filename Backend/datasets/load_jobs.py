import pandas as pd
import json
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB Atlas
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["SkillHorizonDB"]
collection = db["AI_Jobs"]

# Read CSV file
csv_file_path = "Backend/datasets/ai_jobs.csv"
df = pd.read_csv(csv_file_path)

# Convert DataFrame to JSON format
json_records = json.loads(df.to_json(orient="records"))

# Insert into MongoDB
collection.insert_many(json_records)
print("✅ AI job descriptions successfully loaded into MongoDB!")
