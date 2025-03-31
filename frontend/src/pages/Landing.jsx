import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to Skill Horizon</h1>
        <p>Bridging Skill Gaps with AI</p>
        <button className="cta-button" onClick={() => navigate("/upload")}>
          Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default Landing;
