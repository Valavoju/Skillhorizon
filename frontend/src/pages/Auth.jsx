import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialType = searchParams.get("type") || "login"; // Default to login

  const [type, setType] = useState(initialType);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = type === "signup" ? "/signup" : "/login";
    const response = await fetch(`http://127.0.0.1:5000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message || data.error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <h2 className="text-3xl font-bold mb-6">{type === "signup" ? "Sign Up" : "Login"}</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg text-gray-900">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">
          {type === "signup" ? "Sign Up" : "Login"}
        </button>
      </form>

      <p className="mt-4">
        {type === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setType(type === "signup" ? "login" : "signup")} className="text-yellow-300 underline">
          {type === "signup" ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
