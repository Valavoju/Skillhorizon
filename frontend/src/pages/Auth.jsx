import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:5000/${isSignup ? 'signup' : 'login'}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Something went wrong!');
        return;
      }

      alert(data.message || `${isSignup ? 'Signup' : 'Login'} successful!`);

      if (!isSignup && data.access_token) {
        localStorage.setItem('token', data.access_token);
        navigate('/dashboard'); // 🔄 Navigate to dashboard on login
      }

    } catch (err) {
      console.error('Error:', err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        <p onClick={toggleMode} className="switch-mode">
          {isSignup
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
