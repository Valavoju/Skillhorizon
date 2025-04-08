import React, { useState } from 'react';
import { FaBars, FaUpload, FaChartBar, FaSearch, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import JobMatch from './JobMatch'; // Import JobMatch component

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white">
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white text-black transition-all duration-300 shadow-lg`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h1 className="text-lg font-bold">
            {sidebarOpen && 'Skill Horizon'}
          </h1>
          <button onClick={toggleSidebar} className="focus:outline-none">
            <FaBars />
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-4">
          <a href="upload" className="flex items-center gap-2 hover:bg-indigo-100 p-2 rounded">
            <FaUpload /> {sidebarOpen && 'Upload Resume'}
          </a>
          <a href="ScoreMatch" className="flex items-center gap-2 hover:bg-indigo-100 p-2 rounded">
            <FaChartBar /> {sidebarOpen && 'Score Match'}
          </a>
          <a href="#gap" className="flex items-center gap-2 hover:bg-indigo-100 p-2 rounded">
            <FaSearch /> {sidebarOpen && 'Gap Analysis'}
          </a>
          <a href="#extract" className="flex items-center gap-2 hover:bg-indigo-100 p-2 rounded">
            <FaFileAlt /> {sidebarOpen && 'Resume Extract'}
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.h1
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to Skill Horizon Dashboard
        </motion.h1>

        <motion.p
          className="text-lg text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Analyze, Match, and Build AI-powered Career Paths.
        </motion.p>

        {/* Add JobMatch component here to show job matching results */}
        <JobMatch />
      </div>
    </div>
  );
};

export default Dashboard;
