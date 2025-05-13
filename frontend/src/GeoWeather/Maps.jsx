// Maps.jsx (inside GeoWeather folder)
import React, { useState } from "react";

const Maps = () => {
  const [location, setLocation] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    // Placeholder for map integration logic
    console.log(`Search for: ${location}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center pt-32 px-4 pb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-10">
        📍 Fishing Map
      </h1>

      <div className="bg-white p-6 rounded-3xl shadow-lg border-t-4 border-green-400 mb-6">
        <h2 className="text-2xl font-bold text-green-600 mb-3 text-center">
          Explore Marine Zones
        </h2>
        <p className="text-gray-600 text-center">
          View and navigate fishery-specific maps. Identify marine zones with high fishing potential.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          className="p-2 rounded-lg w-80"
          placeholder="Enter Location"
          value={location}
          onChange={handleLocationChange}
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 w-40 py-2"
        >
          Search Map
        </button>
      </div>

      {/* Placeholder for map component */}
      <div className="mt-10">
        {/* Insert map here */}
        <p className="text-center text-gray-600">Map will be displayed here.</p>
      </div>
    </div>
  );
};

export default Maps;
