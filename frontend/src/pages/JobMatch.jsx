import React, { useState } from 'react';
import axios from 'axios';

const JobMatch = () => {
  const [resumeId, setResumeId] = useState('');
  const [matchingResults, setMatchingResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMatchJobs = async () => {
    // Check if the Resume ID is provided
    if (!resumeId) {
      setError('Please provide a valid Resume ID');
      return;
    }

    // Set loading to true to show loading state
    setLoading(true);
    setError('');

    // Retrieve the token from localStorage
    const token = localStorage.getItem('access_token'); 

    try {
      // Make an API call to the backend with the Resume ID and JWT token in headers
      const response = await axios.post(
        'http://localhost:5000/match-jobs', // The backend API endpoint
        { resume_id: resumeId }, // Body of the request
        { headers: { Authorization: `Bearer ${token}` } } // Adding the JWT token to the request headers
      );

      // Set the results to state if the API call is successful
      setMatchingResults(response.data.results);
    } catch (err) {
      // Catch any error and set the error message
      setError('Error fetching matching jobs');
    } finally {
      // Set loading state to false after the API call is finished
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Match Your Resume with Jobs</h2>
      
      {/* Input field for Resume ID */}
      <div className="mb-4">
        <input
          type="text"
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          placeholder="Enter Resume ID"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Match Jobs Button */}
      <button
        onClick={handleMatchJobs}
        className="bg-blue-500 text-white p-2 rounded-md"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Find Matching Jobs'}
      </button>

      {/* Error or success message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display matching results */}
      {matchingResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Matching Jobs</h3>
          <ul>
            {matchingResults.map((result, index) => (
              <li key={index} className="border-b py-2">
                <h4 className="text-lg">{result["Job Title"]}</h4>
                <p>Match Score: {result["Match Score"]}%</p>
                <p>Missing Skills: {result["Missing Skills"].join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobMatch;
