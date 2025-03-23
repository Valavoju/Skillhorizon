import pandas as pd
import json
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# ✅ Correct .env path (Backend/.env)
backend_env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(backend_env_path)

print("MONGO_URI:", os.getenv("MONGO_URI"))


# ✅ Connect to MongoDB Atlas
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

# ✅ Use exact database name from Atlas (case-sensitive)
db = client["skillhorizon"]
collection = db["AI_Jobs"]

# ✅ Read CSV file
csv_file_path = os.path.join(os.path.dirname(__file__), "ai_jobs.csv")
df = pd.read_csv(csv_file_path)

# ✅ Convert DataFrame to JSON and insert into MongoDB
json_records = json.loads(df.to_json(orient="records"))
collection.insert_many(json_records)

print("✅ AI job descriptions successfully loaded into MongoDB!")
