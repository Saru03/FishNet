import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Inventory Management",
      color: "blue",
      desc: "Track your fish stock data seamlessly and efficiently.",
      btn: "Go to Inventory",
      route: "/inventory",
      tip: "Manage all your fish stock data in one central location.",
      liftButton: true,
    },
    {
      title: "Quality Assurance",
      color: "green",
      desc: "Check and ensure the quality of your fish stocks accurately.",
      btn: "Check Quality",
      route: "/quality-assurance",
      tip: "Reduce waste and increase consumer trust with top quality checks.",
    },
    {
      title: "Price Forecast",
      color: "amber",
      desc: "Analyze pricing trends and get smart price predictions.",
      btn: "Check Forecast",
      route: "/forecast-section",
      tip: "Leverage ML-powered insights to stay ahead in the market.",
    },
    {
      title: "Potential Fishing Zones",
      color: "rose",
      desc: "Spot best fishing areas using marine data & historical trends.",
      btn: "View Zones",
      route: "/fishing-zones",
      tip: "Maximize your catch by targeting the right zones.",
      liftButton: true,
    },
    {
      title: "Maps & Weather",
      color: "violet",
      desc: "Get weather updates & marine maps for smarter fishing trips.",
      btn: "Maps & Weather",
      route: "/mapsandweather",
      tip: "Get both weather updates and location info in one place.",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center mt-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-blue-700 mb-4">
        Welcome to <span className="text-green-500">Fish</span><span className="text-blue-400">Net</span>
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10 max-w-xl">
        Empowering Fisheries with Smart Technology 🐟— Plan better and fish safer.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center">
        {cardData.slice(0, 3).map((card, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg border-t-4 border-${card.color}-400 rounded-3xl p-6 w-64 mx-auto hover:shadow-2xl hover:scale-105 transition duration-300 flex flex-col justify-between h-full`}
          >
            <h2 className={`text-2xl font-bold mb-3 text-center text-${card.color}-600`}>
              {card.title}
            </h2>
            <p className="text-gray-600 mb-5 text-center min-h-[72px]">{card.desc}</p>
            <div className={`flex justify-center ${card.liftButton ? "-mt-2" : ""}`}>
              <button
                onClick={() => navigate(card.route)}
                className={`px-4 py-2 bg-${card.color}-500 text-white rounded-full hover:bg-${card.color}-600 transition-all duration-300`}
              >
                {card.btn}
              </button>
            </div>
            <div className={`mt-4 p-3 border rounded-xl bg-${card.color}-50 border-${card.color}-200`}>
              <p className="text-sm text-gray-600 text-center">{card.tip}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center mt-10">
        {cardData.slice(3).map((card, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg border-t-4 border-${card.color}-400 rounded-3xl p-6 w-64 mx-auto hover:shadow-2xl hover:scale-105 transition duration-300 flex flex-col justify-between h-full`}
          >
            <h2 className={`text-2xl font-bold mb-3 text-center text-${card.color}-600`}>
              {card.title}
            </h2>
            <p className="text-gray-600 mb-5 text-center min-h-[72px]">{card.desc}</p>
            <div className={`flex justify-center ${card.liftButton ? "-mt-2" : ""}`}>
              <button
                onClick={() => navigate(card.route)}
                className={`px-4 py-2 bg-${card.color}-500 text-white rounded-full hover:bg-${card.color}-600 transition-all duration-300`}
              >
                {card.btn}
              </button>
            </div>
            <div className={`mt-4 p-3 border rounded-xl bg-${card.color}-50 border-${card.color}-200`}>
              <p className="text-sm text-gray-600 text-center">{card.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
