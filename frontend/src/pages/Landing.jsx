import React from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import ModelViewer from "../components/ModelViewer";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 flex flex-col">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-gradient-to-r from-purple-900 to-blue-900 shadow-lg z-10">
        <h1 className="text-3xl font-bold text-yellow-400">Skill Horizon</h1>
        <div className="flex gap-6">
          <button
            onClick={() => navigate("/auth?type=login")}
            className="text-white font-semibold hover:text-yellow-300 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/auth?type=signup")}
            className="text-white font-semibold hover:text-yellow-300 transition"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-6 md:px-20 py-12 gap-12">
        {/* Left - Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
  <Typewriter
    options={{
      strings: [
        `Welcome to <span style="color: #facc15;">Skill Horizon</span>!`,
      ],
      autoStart: true,
      loop: true,
    }}
  />
</h2>

          <p className="mt-4 text-white text-lg">
            AI-powered career readiness platform to bridge skill gaps and land your dream job.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-6 justify-center md:justify-start">
            <button
              onClick={() => navigate("/auth?type=login")}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/auth?type=signup")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Join Now
            </button>
          </div>
        </div>

        {/* Right - 3D Model */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[550px]">
            <ModelViewer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
