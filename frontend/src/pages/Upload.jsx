import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'; // Import custom styles
import 'animate.css'; // Import animate.css for animations

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post('http://localhost:5000/extract-text', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Resume uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="upload-resume animate__animated animate__fadeIn">
      <h2 className="animate__animated animate__bounceIn">Upload Your Resume</h2>
      <form onSubmit={handleUpload} className="animate__animated animate__fadeIn animate__delay-1s">
        <input 
          type="file" 
          name="resume" 
          onChange={handleFileChange} 
          className="animate__animated animate__fadeIn animate__delay-2s"
        />
        <button type="submit" className="animate__animated animate__zoomIn animate__delay-2.5s">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
