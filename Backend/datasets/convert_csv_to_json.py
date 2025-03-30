import pandas as pd
import json
from pymongo import MongoClient

# 📌 STEP 1: Load CSV file (Update the filename if needed)
csv_file = "ai_jobs.csv"  # Replace with your actual CSV file
df = pd.read_csv(csv_file)

# 📌 STEP 2: Convert CSV to JSON
json_file = "ai_job_description.json"
df.to_json(json_file, orient="records", indent=4)

print(f"✅ CSV converted to JSON and saved as {json_file}")

# 📌 STEP 3: Connect to MongoDB (Update with your MongoDB URI)
MONGO_URI = "mongodb+srv://avinash:avinash123@skillhorizoncluster.a347m.mongodb.net/skillhorizon?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-256"

client = MongoClient(MONGO_URI)
db = client["skillhorizon"]  # Replace with your actual database name

# 📌 STEP 4: Insert JSON data into MongoDB
job_data = json.loads(df.to_json(orient="records"))
db.job_descriptions.insert_many(job_data)

print("✅ Job descriptions imported into MongoDB successfully!")