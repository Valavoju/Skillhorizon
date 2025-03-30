import json
from pymongo import MongoClient

# MongoDB Connection
MONGO_URI = "mongodb+srv://avinashvalavoju:avinash4334@cluster0.pbudvfx.mongodb.net/skillhorizon?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)

# Database and Collection
db = client["skillhorizon"]
collection = db["jobs"]

# Load JSON File
with open("ai_job_description.json", "r", encoding="utf-8") as file:
    jobs_data = json.load(file)

# Insert Data into MongoDB
inserted_docs = collection.insert_many(jobs_data)

print(f"{len(inserted_docs.inserted_ids)} job descriptions inserted successfully!")

# Close Connection
client.close()
