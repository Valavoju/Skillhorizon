import React, { useState } from 'react';
import '../index.css'; // Import custom styles
import 'animate.css'; // Import animate.css for animations

const Sidebar = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => setIsSidebarActive(!isSidebarActive);

  return (
    <>
      <div className={`sidebar ${isSidebarActive ? 'active animate__animated animate__slideInLeft' : 'animate__animated animate__slideOutLeft'}`}>
        <a href="/login" className="sidebar-link animate__animated animate__fadeIn animate__delay-1s">Login</a>
        <a href="/signup" className="sidebar-link animate__animated animate__fadeIn animate__delay-2s">Sign Up</a>
        <a href="/upload" className="sidebar-link animate__animated animate__fadeIn animate__delay-3s">Upload</a>
      </div>

      <div className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰
      </div>
    </>
  );
};

export default Sidebar;
