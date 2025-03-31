import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../index.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2 className="sidebar-title">SkillHorizon</h2>
        <ul className="sidebar-menu">
          <li><Link to="/home">🏠 Home</Link></li>
          <li><Link to="/upload">📂 Upload Resume</Link></li>
          <li><Link to="/analytics">📊 Analytics</Link></li>
          <li><Link to="/settings">⚙️ Settings</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <motion.h1 
          className="dashboard-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Your Dashboard
        </motion.h1>

        {/* Cards Section */}
        <section className="cards-container">
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h3>Uploaded Resumes</h3>
            <p>10 Files</p>
          </motion.div>

          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h3>Skills Matched</h3>
            <p>85%</p>
          </motion.div>

          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h3>Pending Actions</h3>
            <p>3 Tasks</p>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
