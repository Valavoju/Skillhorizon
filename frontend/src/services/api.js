import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Your Flask backend URL

// Upload resume and extract skills, experience, projects
export const uploadResume = async (resumeText) => {
  try {
    const response = await axios.post(`${API_URL}/upload_resume`, {
      resume_text: resumeText,
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading resume:", error);
    return null;
  }
};

// Match jobs based on extracted skills
export const matchJobs = async (resumeId) => {
  try {
    const response = await axios.get(`${API_URL}/match_jobs/${resumeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job matches:", error);
    return null;
  }
};

// Get AI-based learning recommendations for missing skills
export const getSkillRecommendations = async (missingSkills) => {
  try {
    const response = await axios.post(`${API_URL}/recommend_skills`, {
      missing_skills: missingSkills,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching skill recommendations:", error);
    return null;
  }
};
