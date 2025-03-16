import Carousel from "../components/Carousel";

function Reviews() {
  const slides = [
    {
      src: "https://images.unsplash.com/photo-1595986630530-969786b19b4d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "FinTrack has completely changed the way I manage my expenses. The budget tracking and future expense prediction features help me stay on top of my finances effortlessly!",
      name: "Haruka Sato",
      country: "Japan",
    },
    {
      src: "https://images.unsplash.com/photo-1554196038-950a8ab51827?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Using FinTrack has given me better control over my spending habits. The insights and monthly analysis make budgeting easier and more efficient than ever before!",
      name: "Elena Rodriguez",
      country: "Spain",
    },
    {
      src: "https://images.unsplash.com/photo-1622556498246-755f44ca76f3?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "FinTrack’s AI-driven predictions have helped me plan my monthly budget efficiently. It's an essential tool for anyone looking to improve their financial health.",
      name: "Thomas Morgan",
      country: "USA",
    },
  ];

  return (
    <section
      id="reviews"
      className="flex flex-col items-center justify-center bg-gray-100 py-16 px-6 md:px-12 lg:px-24"
    >
      <div className="text-center max-w-3xl">
        <h2 className="text-4xl font-bold text-gray-800">What Our Users Say</h2>
        <p className="mt-4 text-gray-600 text-lg">
          FinTrack is empowering users to take charge of their finances with
          smart budgeting and expense predictions.
        </p>
      </div>
      
        <div className="mx-auto mt-10 ">
          <Carousel slides={slides} />
        </div>
      
    </section>
  );
}

export default Reviews;
