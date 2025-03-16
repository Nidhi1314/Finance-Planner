

import Twitter from "../assets/icons8-twitterx.svg";
import Facebook from "../assets/icons8-facebook.svg";
import Linkedin from "../assets/icons8-linkedin.svg";

function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 w-full mt-20 overflow-hidden">
      <div className="flex w-full flex-col px-8 py-12 text-gray-300 lg:px-12 xl:m-auto">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-0">
          {/* Logo and tagline */}
          <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Fin<span className="text-blue-400">Track</span>
          </h1>
            <p>Track, Analyze & Manage Your Finances Smartly</p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400">Explore</p>
              <a href="#features">Features</a>
              <a href="/login">Login</a>
              <a href="/signup">Register</a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-400">Resources</p>
              <a href="https://github.com/Nidhi1314/Finance-Planner" target="_blank">GitHub</a>
              
              <a href="#features">FAQs</a>
              <a href="#">Contact Us</a>
            </div>
          </div>

          {/* Mobile App Section */}
          <div className="w-fit">
            <h2 className="text-gray-400 mb-2">Get the App</h2>
            <p className="text-sm text-gray-500">Coming soon on iOS & Android</p>
          </div>
        </div>

        {/* Copyright & Social Links */}
        <div className="mt-14 flex flex-col md:flex-row justify-between border-t-2 border-t-gray-700 pt-10">
          <p className="text-gray-400">&copy; 2025 FinTrack. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank">
              <img src={Twitter} alt="Twitter logo" />
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <img src={Facebook} alt="Facebook logo" />
            </a>
            <a href="https://www.linkedin.com" target="_blank">
              <img src={Linkedin} alt="LinkedIn logo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
