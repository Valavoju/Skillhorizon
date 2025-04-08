import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [responseMsg, setResponseMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponseMsg('');
  };

  const handleUpload = async () => {
    if (!file) {
      setResponseMsg("❌ Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append('upload', file);

    try {
      setUploading(true);
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponseMsg(`✅ ${response.data.message}`);
    } catch (error) {
      console.error('Upload error:', error);
      setResponseMsg(`❌ ${error.response?.data?.error || "Something went wrong"}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-indigo-100">
      <div
        className="bg-white bg-opacity-80 border border-gray-300 rounded-xl shadow-xl p-8 w-[90%] max-w-lg transition transform hover:scale-105 duration-300"
        style={{ aspectRatio: '4 / 3' }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">Upload Resume</h2>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="block w-full text-sm mb-4 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
        />

        {file && (
          <p className="text-sm text-gray-700 mb-4">📄 Selected: {file.name}</p>
        )}

        <button
          onClick={handleUpload}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {responseMsg && (
          <p className="mt-4 text-center font-medium text-gray-900">{responseMsg}</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
