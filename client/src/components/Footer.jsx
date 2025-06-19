import Twitter from "../assets/icons8-twitterx.svg";
import Facebook from "../assets/icons8-facebook.svg";
import Linkedin from "../assets/icons8-linkedin.svg";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-[#9e8fe0] via-[#e0f2fe] to-[#f8fafc] w-full mt-20 overflow-hidden text-gray-700"
    >
      <div className="max-w-7xl mx-auto flex flex-col px-8 py-12 lg:px-12">
        {/* Top Section */}
        <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-0">
          {/* Logo + Tagline */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
              Fin<span className="text-black">Track</span>
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              Track, Analyze & Manage Your Finances Smartly
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <p className="text-gray-800 font-semibold">Explore</p>
              <a href="#features" className="hover:text-purple-600 transition">Features</a>
              <a href="/login" className="hover:text-purple-600 transition">Login</a>
              <a href="/signup" className="hover:text-purple-600 transition">Register</a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-800 font-semibold">Resources</p>
              <a href="https://github.com/Nidhi1314/Finance-Planner" target="_blank" className="hover:text-purple-600 transition">GitHub</a>
              <a href="#features" className="hover:text-purple-600 transition">FAQs</a>
              <a href="#" className="hover:text-purple-600 transition">Contact Us</a>
            </div>
          </div>

          {/* App Info */}
          <div className="w-fit">
            <p className="text-gray-800 font-semibold mb-2">Get the App</p>
            <p className="text-sm text-gray-600">Coming soon on iOS & Android</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-8">
          <p className="text-sm text-gray-500">&copy; 2025 FinTrack. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank">
              <img src={Twitter} alt="Twitter" className="w-6 hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <img src={Facebook} alt="Facebook" className="w-6 hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.linkedin.com" target="_blank">
              <img src={Linkedin} alt="LinkedIn" className="w-6 hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
