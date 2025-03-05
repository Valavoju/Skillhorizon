from pymongo import MongoClient

# Correct MongoDB connection string
MONGO_URI = "mongodb://localhost:27017/"

# Connect to MongoDB
client = MongoClient(MONGO_URI)

# Select the database (REMOVE ".db")
db = client["skillhorizon"]  # ✅ Correct database name

# Check connection
try:
    db.command("ping")
    print("✅ Connected to MongoDB successfully!")
except Exception as e:
    print("❌ Failed to connect to MongoDB:", e)
