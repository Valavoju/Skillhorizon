from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

# List databases
print("Databases in MongoDB Atlas:")
print(client.list_database_names())
