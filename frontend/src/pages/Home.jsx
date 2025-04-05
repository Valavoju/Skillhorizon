import React, { useState } from 'react';
import '../index.css'; // Import custom styles
import 'animate.css'; 

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      alert('Login Failed');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      alert('Signup Failed');
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1 className="text-white text-3xl font-semibold">Skill Horizon</h1>
        <div className="nav-links">
          <a href="#" onClick={handleLoginClick}>Login</a>
          <a href="#" onClick={handleSignupClick}>Signup</a>
        </div>
      </header>

      <div className="left-side">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Welcome to Skill Horizon</h2>
          <p className="text-lg mt-4">Empowering you with the right skills for a brighter future!</p>
        </div>
      </div>

      <div className="right-side">
        {showLogin && (
          <div className="form-container active">
            <div className="form">
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mb-4 p-3 w-full bg-white text-black rounded-lg"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mb-4 p-3 w-full bg-white text-black rounded-lg"
              />
              <button onClick={handleLoginSubmit} className="px-6 py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-lg">
                Login
              </button>
            </div>
          </div>
        )}

        {showSignup && (
          <div className="form-container active">
            <div className="form">
              <h2 className="text-2xl font-semibold mb-4">Signup</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mb-4 p-3 w-full bg-white text-black rounded-lg"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mb-4 p-3 w-full bg-white text-black rounded-lg"
              />
              <button onClick={handleSignupSubmit} className="px-6 py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-lg">
                Signup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
