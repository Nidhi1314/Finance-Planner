import phone from '../assets/phone.jpg';
import userimage from '../assets/userimage.jpeg';
import {useNavigate} from "react-router-dom";

function Hero() {
  const navigate=useNavigate();
  const handleregister=()=>{
    navigate("/signup");
  }

  return (
    
    <section className="mt-8 max-w-7xl mx-auto flex flex-col items-center gap-12 px-6 lg:px-12">
      
      {/* Welcome Section */}
      <div className=" w-full py-4 px-6 rounded-lg text-center ">
        <h2 className="text-4xl font-semibold text-gray-800">Welcome to Fin<span className="text-blue-700">Track</span></h2>
        <p className="text-gray-600 mt-5 text-2xl">Your smart way to track finances and plan your future.</p>
        
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 w-full">
        
        {/* Left Section - Text Content */}
        <div className="flex flex-col md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl leading-tight">
            Start Spending the <span className="text-blue-500">Smart</span> Way
          </h1>
          <p className="text-lg text-gray-600">
            Take control of your finances with our Finance Planner! Track your monthly expenses, budget for special occasions, and get accurate future expense predictions powered by advanced machine learning models. Plan smarter, live better!
          </p>
          <button onClick={handleregister} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 w-fit">
            Get Started
          </button>
        </div>

        {/* Right Section - Images */}
        <div className="relative flex justify-center items-center md:w-1/2">
          {/* Primary Phone Image */}
          <img
            className="w-80 h-80 md:w-72 md:h-72 rounded-xl object-cover shadow-lg"
            src={phone}
            alt="Finance Planner App"
          />
          
          {/* Overlapping User Image */}
          <img
            className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 rounded-xl object-cover shadow-xl border-4 border-white"
            src={userimage}
            alt="User Experience"
          />
        </div>

      </div>

    </section>
  );
}

export default Hero;
