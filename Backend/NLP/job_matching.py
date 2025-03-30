from Backend.Database.db_connection import job_collection, resume_collection

def compute_match_score(resume, job):
    resume_skills = set(map(str.lower, resume["skills"]))
    job_skills = set(map(str.lower, job["Required Skills"].split(",")))

    skill_match_score = len(resume_skills & job_skills) / len(job_skills) * 100
    experience_match = 100 if resume["experience"] >= int(job["Experience Level"].split()[0]) else 50
    project_match = any(proj.lower() in job["Job Title"].lower() for proj in resume["projects"])

    final_score = (0.6 * skill_match_score) + (0.3 * experience_match) + (0.1 * (100 if project_match else 0))
    return round(final_score, 2)

def gap_analysis(resume, job):
    resume_skills = set(map(str.lower, resume["skills"]))
    job_skills = set(map(str.lower, job["Required Skills"].split(",")))

    return list(job_skills - resume_skills)

def match_resume_with_jobs(resume_id):
    resume = resume_collection.find_one({"_id": resume_id})
    jobs = list(job_collection.find({}))

    results = []
    for job in jobs:
        score = compute_match_score(resume, job)
        missing_skills = gap_analysis(resume, job)
        results.append({
            "Job Title": job["Job Title"],
            "Match Score": score,
            "Missing Skills": missing_skills
        })
    return results
