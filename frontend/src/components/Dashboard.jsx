import React from "react";
import Sidebar from "./Sidebar";
import UploadResume from "./Upload";

const Dashboard = () => {
  return (
    <div className="dashboard-container flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="content p-6 w-full ml-64">
        <h1 className="text-3xl font-bold mb-6">Welcome to Skill Horizon</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-2xl font-bold">1,250</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Resumes Processed</h3>
            <p className="text-2xl font-bold">430</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Skill Matches</h3>
            <p className="text-2xl font-bold">92%</p>
          </div>
        </div>

        {/* Upload Resume Section */}
        <UploadResume />
      </div>
    </div>
  );
};

export default Dashboard;
