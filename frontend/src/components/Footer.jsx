import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-6 text-center">
      <p>© {new Date().getFullYear()} Skill Horizon. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
