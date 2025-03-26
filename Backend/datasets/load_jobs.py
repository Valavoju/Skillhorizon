import json
import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# ✅ Load .env variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# ✅ Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["skillhorizon"]  # Change this if your DB name is different
collection = db["jobs"]  # Change this if your collection name is different

print("✅ Successfully connected to MongoDB Atlas!")

# ✅ Load CSV File
csv_file = "ai_jobs.csv"  # Ensure the CSV file is in the same directory as this script
try:
    # 📌 Read CSV file using pandas
    df = pd.read_csv(csv_file)

    # Convert CSV data to JSON (list of dictionaries)
    json_records = df.to_dict(orient="records")

    print("📌 Loaded Data:", json.dumps(json_records[:3], indent=2))  # Print first 3 records to check

    # ✅ Insert data into MongoDB
    if json_records:
        collection.insert_many(json_records)
        print(f"✅ Successfully inserted {len(json_records)} job listings into MongoDB!")
    else:
        print("⚠️ No data found in CSV file!")

except Exception as e:
    print(f"❌ Error inserting data into MongoDB: {e}")
