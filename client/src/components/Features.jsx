import AppFrame from "../assets/app_frame.jpeg";
import ShieldCheck from "../assets/check2.png";
import Coins from "../assets/coin3.jpeg";
import Frames from "../assets/frames1.jpeg";

function Features() {
  return (
    <section id="features" className="flex max-w-7xl flex-col gap-12 px-6 pt-10 lg:px-12 xl:m-auto xl:pt-20">
      
      {/* Section Heading */}
      <article className="text-center text-gray-600">
        <h1 className="mb-4 text-4xl font-semibold text-gray-800">
          Maximize Your Savings Effortlessly!
        </h1>
        <p className="text-xl">
          Discover the powerful features of <span className="text-blue-700 font-semibold">FinTrack</span>  
          and take charge of your financial journey today.
        </p>
      </article>

      {/* First Feature Section */}
      <article className="flex flex-col gap-8 xl:flex-row xl:h-96">
        
        {/* Feature Box - Finance Management */}
        <div className="flex flex-col rounded-2xl bg-sky-100 p-8 md:flex-row md:gap-8 xl:w-2/3">
          <div className="flex flex-col justify-center gap-4 text-center md:ml-10 md:w-1/2 md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">
              Smart Expense Tracking
            </h2>
            <p className="text-gray-600">
              FinTrack helps you monitor your daily expenses, categorize spending,  
              and set monthly budgets to stay financially secure.
            </p>
          </div>

          <div className="m-auto mt-5 max-w-72 md:w-1/2">
            <img src={AppFrame} alt="Finance tracking app frame" className="rounded-xl shadow-md" />
          </div>
        </div>

        {/* Feature Box - Security */}
        <div className="flex flex-col justify-center gap-4 rounded-2xl bg-indigo-100 p-10 xl:w-1/3">
          <div className="w-fit rounded-full bg-indigo-200 p-4">
            <img src={ShieldCheck} alt="Shield Icon" className="w-12" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800">
            Bank-Level Security
          </h2>
          <p className="text-gray-600">
            Your data and transactions are protected with industry-standard  
            security encryption. No worries, no hidden risks!
          </p>
        </div>

      </article>

      {/* Second Feature Section */}
      <article className="flex flex-col gap-8 xl:flex-row xl:h-96">
        
        {/* Feature Box - Cost Reduction */}
        <div className="flex flex-col justify-center gap-4 rounded-2xl bg-orange-100 p-10 xl:w-1/3">
          <div className="w-fit rounded-full bg-orange-200 p-4">
            <img src={Coins} alt="Coins Icon" className="w-12" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800">
            Smart Budgeting
          </h2>
          <p className="text-gray-600">
            Reduce unnecessary spending and set better financial goals  
            with AI-powered budget recommendations.
          </p>
        </div>

        {/* Feature Box - Money Exchange */}
        <div className="flex flex-col rounded-2xl bg-sky-100 p-8 md:flex-row md:gap-8 xl:w-2/3">
          <div className="flex flex-col justify-center gap-4 text-center md:ml-10 md:w-1/2 md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">
              Easy Money Transfers
            </h2>
            <p className="text-gray-600">
              Send and receive money effortlessly with real-time transaction  
              tracking and instant notifications.
            </p>
          </div>

          <div className="m-auto max-w-96 md:mt-8 md:w-1/2">
            <img src={Frames} alt="Finance transaction display" className="rounded-xl shadow-md" />
          </div>
        </div>

      </article>
    </section>
  );
}

export default Features;
