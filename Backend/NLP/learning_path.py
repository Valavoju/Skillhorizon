import openai
import os
from dotenv import load_dotenv

# Load API Key
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

def get_learning_recommendations(missing_skills):
    prompt = f"""
    I am missing the following skills for my desired job: {', '.join(missing_skills)}.
    Suggest online courses or learning resources to help me acquire these skills.
    """
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"]

# Example Usage
missing_skills = ["TensorFlow", "Data Science"]
print(get_learning_recommendations(missing_skills))
