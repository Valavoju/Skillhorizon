import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar fixed h-full w-64 p-5">
      <h2 className="text-xl font-bold mb-6">Skill Horizon</h2>
      <nav>
        <a href="#" className="block p-3">Dashboard</a>
        <a href="#" className="block p-3">Upload Resume</a>
        <a href="#" className="block p-3">Settings</a>
        <a href="#" className="block p-3">Logout</a>
      </nav>
    </div>
  );
};

export default Sidebar;
