import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");

  const handleWeatherSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location }),
      });

      const data = await response.json();
      setWeatherInfo(data.result);
    } catch (error) {
      console.error("Weather fetch error:", error);
      setWeatherInfo("Error fetching weather data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-10 px-4 bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-blue-700 mb-4 drop-shadow-md transition-all duration-300">
        Welcome to <span className="text-green-500">Fish</span>
        <span className="text-blue-400">Net</span>
      </h1>

      <p className="text-lg text-center text-gray-600 mb-10 max-w-xl">
        Empowering Fisheries with Smart Technology 🐟— Plan better and fish safer.
      </p>

      <div className="flex flex-wrap justify-center gap-10 mb-16">
        {/* Card Template */}
        {[
          {
            title: "Inventory Management",
            color: "blue",
            desc: "Keep track of your fish stocks effortlessly. View quantities, pricing, and manage updates — all in one place.",
            btn: "Go to Inventory",
            route: "/inventory",
            tip: "Manage all your fish stock data in one central location.",
          },
          {
            title: "Quality Assurance",
            color: "green",
            desc: "Ensure the quality of your fish with our advanced quality assurance tools.",
            btn: "Check Quality",
            route: "/quality-assurance",
            tip: "Reduce waste and increase consumer trust with top quality checks.",
          },
          {
            title: "Price Forecast",
            color: "orange",
            desc: "Explore pricing trends and predictions to make smarter decisions.",
            btn: "Check Forecast",
            route: "/forecast-section",
            tip: "Leverage ML-powered insights to stay ahead in the market.",
          },
        ].map((card, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg border-t-4 border-${card.color}-400 rounded-3xl p-6 w-80 hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out`}
          >
            <h2 className={`text-2xl font-bold text-${card.color}-600 mb-3`}>
              {card.title}
            </h2>
            <p className="text-gray-600 mb-5">{card.desc}</p>
            <button
              onClick={() => navigate(card.route)}
              className={`px-4 py-2 bg-${card.color}-500 text-white rounded-full hover:bg-${card.color}-600 transition-all duration-300`}
            >
              {card.btn}
            </button>
            <div
              className={`mt-4 p-3 border rounded-xl bg-${card.color}-50 border-${card.color}-200`}
            >
              <p className="text-sm text-gray-600">{card.tip}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Weather Forecast Section */}
      <div className="w-full max-w-xl bg-white shadow-lg border-t-4 border-blue-400 p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          🌤️ Weather Forecast
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Get real-time weather updates to plan safe and productive fishing trips.
          Avoid storms, optimize routes, and make smart decisions.
        </p>
        <form
          onSubmit={handleWeatherSubmit}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            required
            className="flex-grow border border-blue-300 p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Get Weather
          </button>
        </form>
        {weatherInfo && (
          <p className="mt-4 text-gray-700 text-center border-t pt-4">
            {weatherInfo}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
