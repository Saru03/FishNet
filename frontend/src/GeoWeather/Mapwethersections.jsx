import React from "react";
import { useNavigate } from "react-router-dom";

const MapweatherSections = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center pt-32 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
        {/* Maps Section */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border-t-4 border-green-400">
          <h2 className="text-2xl font-bold text-green-600 mb-3 text-center">
            📍 Location Map
          </h2>
          <p className="text-gray-600 text-center">
            View fishery-specific maps and track marine zones. Navigate through
            regions and find the best fishing locations visually.
          </p>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => navigate("/maps")}
              className="bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 w-40 py-2"
            >
              View Map
            </button>
          </div>
        </div>

        {/* Weather Section */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border-t-4 border-blue-400">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 text-center">
            🌦️ Real-Time Weather
          </h2>
          <p className="text-gray-600 text-center">
            Stay updated with current weather conditions. Use this data to plan
            safer and more effective fishing operations.
          </p>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => navigate("/weather")}
              className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 w-40 py-2"
            >
              Check Weather
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapweatherSections;
