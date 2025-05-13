// Weather.jsx (inside GeoWeather folder)
import React, { useState } from "react";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    // Show a general error message if location is empty
    if (location.trim() === "") {
      setError("Please enter a valid location.");
    } else {
      setError("Unable to fetch weather data. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center pt-32 px-4 pb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-10">
        🌦️ Real-Time Weather
      </h1>

      <div className="bg-white p-6 rounded-3xl shadow-lg border-t-4 border-blue-400 mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-3 text-center">
          Current Weather Data
        </h2>
        <p className="text-gray-600 text-center">
          Stay updated with current weather conditions, ideal for planning fishing trips.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          className="p-2 rounded-lg border-2 border-gray-300 w-80"
          placeholder="Enter Location"
          value={location}
          onChange={handleLocationChange}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 w-40 py-2"
        >
          Check Weather
        </button>
      </div>

      {error && (
        <div className="mt-6 bg-red-100 text-red-600 p-4 rounded-lg shadow-md w-full sm:w-3/4 lg:w-1/2 text-center">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
