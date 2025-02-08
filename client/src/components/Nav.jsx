import React from "react";

function Nav() {
  return (
    <nav className="w-full bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-6 py-5">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Fin<span className="text-blue-400">Track</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            About
          </a>
          <a href="#features" className="text-gray-300 hover:text-white transition duration-300">
            Features
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            Reviews
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            Contact Us
          </a>
        </div>

        {/* Login Button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition duration-300 shadow-md">
          Login/Signup
        </button>
      </div>
    </nav>
  );
}

export default Nav;
