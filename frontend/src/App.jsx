import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Upload from "./components/Upload";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Toggle Login Form visibility
  const handleLoginClick = () => {
    setShowLogin(!showLogin);
    setShowSignup(false); // Hide signup when login is clicked
  };

  // Toggle Signup Form visibility
  const handleSignupClick = () => {
    setShowSignup(!showSignup);
    setShowLogin(false); // Hide login when signup is clicked
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1>Skill Horizon</h1>
        <div className="nav-links">
          <a href="#!" onClick={handleLoginClick}>Login</a>
          <a href="#!" onClick={handleSignupClick}>Sign Up</a>
        </div>
      </header>

      {/* Login Form */}
      {showLogin && (
        <div className="form-container active">
          <div className="form">
            <h2>Login</h2>
            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* Signup Form */}
      {showSignup && (
        <div className="form-container active">
          <div className="form">
            <h2>Sign Up</h2>
            <form>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}

      {/* Upload Page */}
      <Upload />
    </div>
  );
};

export default App;
