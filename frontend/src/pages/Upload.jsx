import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/extract-text", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setText(result.extractedText);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  return (
    <div className="hero-section">
      <motion.h1
        className="text-4xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Upload Your Resume
      </motion.h1>
      <input type="file" onChange={handleFileChange} className="file-input my-4" />
      <button onClick={handleUpload} className="cta-button">Extract Text</button>
      <Link to="/" className="cta-button mx-2">Back to Landing</Link>

      {text && (
        <motion.div
          className="about-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold">Extracted Text:</h2>
          <p className="text-gray-300 text-lg">{text}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Upload;
