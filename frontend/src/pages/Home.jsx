import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero-section">
      <motion.h1
        className="text-4xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to Home
      </motion.h1>
      <motion.p
        className="text-lg text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Explore AI-driven career insights.
      </motion.p>
      <div className="mt-6">
        <Link to="/" className="cta-button mx-2">Back to Landing</Link>
        <Link to="/upload" className="cta-button mx-2">Upload Resume</Link>
      </div>

      {/* About Section */}
      <motion.section
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold">About SkillHorizon</h2>
        <p className="text-gray-300 text-lg">
          SkillHorizon is an AI-powered platform that helps job seekers identify skill gaps and upskill efficiently.
        </p>
      </motion.section>
    </div>
  );
};

export default Home;
