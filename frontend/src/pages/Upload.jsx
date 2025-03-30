import { useState } from "react";
import { uploadResume, matchJobs, getSkillRecommendations } from "../services/api";

const UploadResume = () => {
  const [resumeText, setResumeText] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [jobMatches, setJobMatches] = useState([]);
  const [learningPaths, setLearningPaths] = useState("");

  const handleUpload = async () => {
    const data = await uploadResume(resumeText);
    if (data) {
      setResumeData(data.data);
      fetchJobMatches(data.data._id);
    }
  };

  const fetchJobMatches = async (resumeId) => {
    const matches = await matchJobs(resumeId);
    setJobMatches(matches);
    fetchLearningPaths(matches[0]?.["Missing Skills"] || []);
  };

  const fetchLearningPaths = async (missingSkills) => {
    if (missingSkills.length > 0) {
      const recommendations = await getSkillRecommendations(missingSkills);
      setLearningPaths(recommendations.recommendations);
    }
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <textarea
        rows="5"
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume text here..."
      ></textarea>
      <button onClick={handleUpload}>Upload</button>

      {resumeData && (
        <div>
          <h3>Extracted Data</h3>
          <p>Skills: {resumeData.skills.join(", ")}</p>
          <p>Experience: {resumeData.experience} years</p>
          <p>Projects: {resumeData.projects.join(", ")}</p>
        </div>
      )}

      {jobMatches.length > 0 && (
        <div>
          <h3>Matching Jobs</h3>
          {jobMatches.map((job, index) => (
            <div key={index}>
              <p>Job: {job["Job Title"]}</p>
              <p>Match Score: {job["Match Score"]}%</p>
              <p>Missing Skills: {job["Missing Skills"].join(", ")}</p>
            </div>
          ))}
        </div>
      )}

      {learningPaths && (
        <div>
          <h3>Recommended Learning Path</h3>
          <p>{learningPaths}</p>
        </div>
      )}
    </div>
  );
};

export default UploadResume;
