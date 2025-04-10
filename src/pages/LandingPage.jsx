import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-300 animate-gradient text-white flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          Welcome to 
        </h1>
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          <span className="text-yellow-300">Mission Impossible</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/90">
          Database real time watch implementation.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
            <a href="/login">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;