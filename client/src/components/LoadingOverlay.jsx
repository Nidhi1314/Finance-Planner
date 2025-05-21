const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <div className="absolute inset-0 bg-black/50  flex items-center justify-center z-50 transition-opacity duration-300 opacity-100">
      <div className="flex flex-col items-center space-y-4">
        {/* Colorful spinner */}
        <div className="relative w-16 h-16">
  {/* Static light ring */}
  <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>

  {/* Gradient colorful ring spinning */}
  <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
       style={{
         borderImage: 'conic-gradient(from 0deg, #4f46e5, #ec4899, #3b82f6, #4f46e5) 1',
         borderImageSlice: 1,
       }}
  ></div>
</div>
        {/* Loading message */}
        <p className="text-white text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
