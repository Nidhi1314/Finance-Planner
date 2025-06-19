import React from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gradient-to-r from-purple-700 via-purple-500 to-fuchsia-600 shadow-lg backdrop-blur-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-white">
          Fin<span className="text-white">Track</span>
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white hover:text-blue-200 transition font-medium">
            About
          </a>
          <a href="#features" className="text-white hover:text-blue-200 transition font-medium">
            Features
          </a>
          <a href="#reviews" className="text-white hover:text-blue-200 transition font-medium">
            Reviews
          </a>
          <a href="#contact" className="text-white hover:text-blue-200 transition font-medium">
            Contact Us
          </a>
        </div>

        {/* Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-purple-700 px-5 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300 shadow-md"
        >
          Login / Signup
        </button>
      </div>
    </nav>
  );
}

export default Nav;
