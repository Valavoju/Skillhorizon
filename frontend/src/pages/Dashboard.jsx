import React, { useState } from 'react';
import '../index.css'; // Import custom styles
import 'animate.css'; // Import animate.css for animations

const Dashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarActive ? 'active' : ''} animate__animated animate__slideInLeft`}>
        <a href="#home" className="animate__animated animate__fadeIn animate__delay-1s">Home</a>
        <a href="#services" className="animate__animated animate__fadeIn animate__delay-1.5s">Services</a>
        <a href="#about" className="animate__animated animate__fadeIn animate__delay-2s">About</a>
        <a href="#contact" className="animate__animated animate__fadeIn animate__delay-2.5s">Contact</a>
      </div>

      {/* Main content area */}
      <div className="content">
        <button onClick={toggleSidebar} className="sidebar-toggle-btn animate__animated animate__bounceIn">
          ☰
        </button>
        <h1 className="animate__animated animate__fadeIn">Welcome to Skill Horizon Dashboard!</h1>
      </div>
    </div>
  );
};

export default Dashboard;
