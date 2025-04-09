import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome!</h1>
        <p>Navigate using the buttons below:</p>
        <div className="space-x-4">
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded">Login</Link>
          <Link to="/dashboard" className="border border-white px-4 py-2 rounded">Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
