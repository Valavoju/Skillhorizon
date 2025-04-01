import React, { useState, useRef } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  // Handle file selection from input
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle Drag & Drop
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  // Handle Click to Open File Dialog
  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  // Handle Upload
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("upload", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message || "Upload successful!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Drag & Drop Box */}
      <div
        className="w-96 h-48 flex items-center justify-center border-2 border-dashed border-gray-400 bg-white/20 backdrop-blur-md rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-all"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog} // Click opens file input
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-white">
          Drag & Drop or <span className="text-blue-400 underline">Click</span>{" "}
          to Upload
        </p>
      </div>

      {file && <p className="mt-3 text-gray-300">{file.name}</p>}

      <button
        className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition"
        onClick={handleUpload}
      >
        Upload
      </button>

      {message && <p className="mt-2 text-gray-300">{message}</p>}
    </div>
  );
};

export default Upload;
