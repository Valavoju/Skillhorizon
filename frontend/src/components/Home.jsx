import React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation

const Home = () => {
  return (
    <div className="hero-section">
      {/* Navbar with login and signup buttons */}
      <div className="navbar">
        <div className="logo text-white text-3xl font-extrabold">Skill Horizon</div>
        <div>
          <Link to="/login" className="nav-item mr-4">Login</Link>
          <Link to="/signup" className="nav-item">Sign Up</Link>
        </div>
      </div>

      {/* Hero Section Content */}
      <h1>Welcome to Skill Horizon</h1>
      <p>Your personalized learning platform for career readiness!</p>
      <Link to="/dashboard">
        <button className="cta-button">Get Started</button>
      </Link>

      {/* Login/Sign Up Cards */}
      <div className="login-signup-container">
        <div className="card-container">
          {/* Login Card */}
          <div className="card">
            <div className="card-content">
              <div className="card-title">Login</div>
              <input type="text" className="card-input" placeholder="Email" />
              <input type="password" className="card-input" placeholder="Password" />
              <button className="card-button">Login</button>
            </div>
          </div>
          
          {/* Sign Up Card */}
          <div className="card">
            <div className="card-content">
              <div className="card-title">Sign Up</div>
              <input type="text" className="card-input" placeholder="Name" />
              <input type="email" className="card-input" placeholder="Email" />
              <input type="password" className="card-input" placeholder="Password" />
              <button className="card-button">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
