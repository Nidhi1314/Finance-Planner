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
            Easy-to-Use & Intuitive Design

            </h2>
            <p className="text-gray-600">
              FinTrack provides a clean and simple interface designed for effortless tracking.  
              Navigate through your finances with ease and take control instantly.
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
          Secure Bank Statement Upload
          </h2>
          <p className="text-gray-600">
          Upload your bank statements with end-to-end encryption. Your data  
      remains private while our system extracts key financial insights.

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
          Expense Analysis
          </h2>
          <p className="text-gray-600">
          Get a clear breakdown of where your money goes each month.  
          Visualize spending categories, trends, and savings in real-time.
          </p>
        </div>

        {/* Feature Box - Money Exchange */}
        <div className="flex flex-col rounded-2xl bg-sky-100 p-8 md:flex-row md:gap-8 xl:w-2/3">
          <div className="flex flex-col justify-center gap-4 text-center md:ml-10 md:w-1/2 md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">
            Next Month’s Expense Prediction
            </h2>
            <p className="text-gray-600">
            Using AI models like ARIMA & LSTM, FinTrack predicts your  
            next month’s expenses so you can plan ahead and save more.
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
