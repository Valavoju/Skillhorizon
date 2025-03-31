import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Skill Horizon</h2>
        <nav>
          <Link to="/home">🏠 Home</Link>
          <Link to="/upload">📂 Upload Resume</Link>
          <Link to="/profile">👤 My Profile</Link>
          <Link to="/analytics">📊 Analytics</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="content">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>1,023</p>
          </div>
          <div className="stat-card">
            <h3>Resumes Analyzed</h3>
            <p>748</p>
          </div>
          <div className="stat-card">
            <h3>AI Matches Found</h3>
            <p>425</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
