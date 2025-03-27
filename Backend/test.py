import os
import pymongo
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

try:
    # ✅ Connect to MongoDB
    client = pymongo.MongoClient(MONGO_URI)
    db = client["skillhorizon"]  # Database name
    collection = db["users"]  # Collection name

    print("✅ Successfully connected to MongoDB!")

    # 📌 Fetch all user documents from the "users" collection
    users = collection.find()  

    # ✅ Print the retrieved documents
    print("\n👥 Users Collection Data:")
    for user in users:
        print(user)  # Prints each user document

except Exception as e:
    print("❌ Error:", e)
