import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScoreMatch = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state) {
      setTimeout(() => setLoading(false), 2000); // simulate loading
    }
  }, [state]);

  if (!state) {
    return (
      <div className="p-6 text-center text-gray-500">⚠️ No data found. Please upload a resume first.</div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-200">
        <h1 className="text-3xl font-bold text-indigo-700 animate-pulse">🔄 Analyzing Resume...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-6 text-indigo-700">📊 Skill Match Results</h2>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">👤 Name: {state.resume.name}</h3>
          <p>🧠 Skills: {state.resume.skills.join(', ')}</p>
        </div>

        {state.matches.map((job, idx) => (
          <div key={idx} className="bg-white p-5 rounded shadow border-l-4 border-indigo-500">
            <h4 className="text-lg font-bold">{job.title}</h4>
            <p>✅ Match Score: {job.match}%</p>
            <p>⚠️ Missing Skills: {job.missing_skills.join(', ') || 'None'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreMatch;
