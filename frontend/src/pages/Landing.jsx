import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="hero-section">
      <motion.h1
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to SkillHorizon
      </motion.h1>
      <motion.p
        className="text-lg text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Bridging Skill Gaps with AI
      </motion.p>
      <div className="mt-6">
        <Link to="/home" className="cta-button mx-2">Go to Home</Link>
        <Link to="/upload" className="cta-button mx-2">Upload Resume</Link>
      </div>
    </div>
  );
};

export default Landing;
