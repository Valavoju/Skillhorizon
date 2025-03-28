import os
import pymongo
from dotenv import load_dotenv

# ✅ Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

try:
    # ✅ Connect to MongoDB
    client = pymongo.MongoClient(MONGO_URI)
    db = client["skillhorizon"]

    # ✅ Check connection
    print("✅ Successfully connected to MongoDB!")
    print("🗂️ Available Databases:", client.list_database_names())

except Exception as e:
    print("❌ Error:", e)
