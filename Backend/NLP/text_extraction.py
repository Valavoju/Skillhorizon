import spacy
import re
from Backend.Database.db_connection import resume_collection

# Load NLP Model
nlp = spacy.load("en_core_web_sm")

# Sample Skill Set (Extendable)
SKILL_SET = {"Python", "Machine Learning", "Deep Learning", "NLP", "TensorFlow", "Keras", "Data Science"}

def extract_skills(text):
    extracted_skills = {token.text for token in nlp(text) if token.text in SKILL_SET}
    return list(extracted_skills)

def extract_experience(text):
    match = re.search(r"(\d+)\+?\s*years?", text, re.IGNORECASE)
    return int(match.group(1)) if match else 0

def extract_projects(text):
    return re.findall(r"(?:Project:|Title:)\s*(.*?)\n", text, re.IGNORECASE)

def process_resume(resume_text):
    extracted_data = {
        "skills": extract_skills(resume_text),
        "experience": extract_experience(resume_text),
        "projects": extract_projects(resume_text)
    }
    resume_collection.insert_one(extracted_data)
    return extracted_data
