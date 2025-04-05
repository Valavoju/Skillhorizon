import React from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import ModelViewer from "../components/ModelViewer";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const scrollToAbout = () => {
    const section = document.getElementById("about");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500 flex flex-col">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-900 to-blue-900 shadow-lg z-10">
        <h1 className="text-3xl font-bold text-yellow-400">Skill Horizon</h1>
        <div className="flex gap-6">
          <button onClick={scrollToAbout} className="text-white font-semibold hover:text-yellow-300 transition">About</button>
          <button onClick={scrollToContact} className="text-white font-semibold hover:text-yellow-300 transition">Contact</button>
          <button onClick={() => navigate("/auth?type=login")} className="text-white font-semibold hover:text-yellow-300 transition">Login</button>
          <button onClick={() => navigate("/auth?type=signup")} className="text-white font-semibold hover:text-yellow-300 transition">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-6 md:px-20 py-12 gap-12">
        {/* Left - Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <Typewriter
              options={{
                strings: [`Welcome to <span style="color: #facc15;">Skill Horizon</span>!`],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </h2>
          <p className="mt-4 text-white text-lg">
            AI-powered career readiness platform to bridge skill gaps and land your dream job.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <button onClick={() => navigate("/auth?type=login")} className="bg-white text-sky-700 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">Get Started</button>
            <button onClick={scrollToAbout} className="bg-white text-sky-700 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">Learn More</button>
          </div>
        </div>

        {/* Right - 3D Model */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-[350px] h-[500px] md:w-[450px] md:h-[600px] lg:w-[550px] lg:h-[700px]">
            <ModelViewer />
          </div>
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="bg-white text-gray-800 py-20 px-10">
        <h2 className="text-3xl font-bold text-center mb-8">About Skill Horizon</h2>
        <p className="text-center max-w-4xl mx-auto text-lg">
          Skill Horizon is your AI-powered career companion, helping bridge the gap between your resume and your dream job. We analyze your skills, match job descriptions, and guide your learning with personalized recommendations, ensuring you're always a step ahead.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-100 text-gray-800 py-20 px-10">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <form className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-lg border border-gray-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-lg border border-gray-300"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="p-4 rounded-lg border border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
