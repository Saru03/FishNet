import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Inventory Management",
      desc: "Track your fish stock data seamlessly and efficiently.",
      btn: "Go to Inventory",
      route: "/inventory",
      tip: "Manage all your fish stock data in one central location.",
      liftButton: true,
      styles: {
        border: "border-blue-400",
        title: "text-blue-600",
        bg: "bg-blue-500",
        bgHover: "hover:bg-blue-600",
        ring: "focus:ring-blue-300",
        boxBg: "bg-blue-50",
        boxBorder: "border-blue-200",
      },
    },
    {
      title: "Quality Assurance",
      desc: "Check and ensure the quality of your fish stocks accurately.",
      btn: "Check Quality",
      route: "/quality-assurance",
      tip: "Reduce waste and increase consumer trust with top quality checks.",
      styles: {
        border: "border-green-400",
        title: "text-green-600",
        bg: "bg-green-500",
        bgHover: "hover:bg-green-600",
        ring: "focus:ring-green-300",
        boxBg: "bg-green-50",
        boxBorder: "border-green-200",
      },
    },
    {
      title: "Price Forecast",
      desc: "Analyze pricing trends and get smart price predictions.",
      btn: "Check Forecast",
      route: "/forecast-section",
      tip: "Leverage ML-powered insights to stay ahead in the market.",
      styles: {
        border: "border-amber-400",
        title: "text-amber-600",
        bg: "bg-amber-500",
        bgHover: "hover:bg-amber-600",
        ring: "focus:ring-amber-300",
        boxBg: "bg-amber-50",
        boxBorder: "border-amber-200",
      },
    },
    {
      title: "Potential Fishing Zones",
      desc: "Spot best fishing areas using marine data & historical trends.",
      btn: "View Zones",
      route: "/fishing-zones",
      tip: "Maximize your catch by targeting the right zones.",
      liftButton: true,
      styles: {
        border: "border-rose-400",
        title: "text-rose-600",
        bg: "bg-rose-500",
        bgHover: "hover:bg-rose-600",
        ring: "focus:ring-rose-300",
        boxBg: "bg-rose-50",
        boxBorder: "border-rose-200",
      },
    },
    {
      title: "Maps & Weather",
      desc: "Get weather updates & marine maps for smarter fishing trips.",
      btn: "Maps & Weather",
      route: "/mapsandweather",
      tip: "Get both weather updates and location info in one place.",
      styles: {
        border: "border-violet-400",
        title: "text-violet-600",
        bg: "bg-violet-500",
        bgHover: "hover:bg-violet-600",
        ring: "focus:ring-violet-300",
        boxBg: "bg-violet-50",
        boxBorder: "border-violet-200",
      },
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
            className={`bg-white shadow-lg border-t-4 ${card.styles.border} rounded-3xl p-6 w-64 mx-auto hover:shadow-2xl hover:scale-105 transition duration-300 flex flex-col justify-between h-full`}
          >
            <h2 className={`text-2xl font-bold mb-3 text-center ${card.styles.title}`}>
              {card.title}
            </h2>
            <p className="text-gray-600 mb-5 text-center min-h-[72px]">{card.desc}</p>
            <div className={`flex justify-center ${card.liftButton ? "-mt-2" : ""}`}>
              <button
                onClick={() => navigate(card.route)}
                className={`px-5 py-2 ${card.styles.bg} text-white rounded-full font-semibold shadow-md ${card.styles.bgHover} hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none ${card.styles.ring}`}
              >
                {card.btn}
              </button>
            </div>
            <div className={`mt-4 p-3 border rounded-xl ${card.styles.boxBg} ${card.styles.boxBorder}`}>
              <p className="text-sm text-gray-600 text-center">{card.tip}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center mt-10">
        {cardData.slice(3).map((card, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg border-t-4 ${card.styles.border} rounded-3xl p-6 w-64 mx-auto hover:shadow-2xl hover:scale-105 transition duration-300 flex flex-col justify-between h-full`}
          >
            <h2 className={`text-2xl font-bold mb-3 text-center ${card.styles.title}`}>
              {card.title}
            </h2>
            <p className="text-gray-600 mb-5 text-center min-h-[72px]">{card.desc}</p>
            <div className={`flex justify-center ${card.liftButton ? "-mt-2" : ""}`}>
              <button
                onClick={() => navigate(card.route)}
                className={`px-5 py-2 ${card.styles.bg} text-white rounded-full font-semibold shadow-md ${card.styles.bgHover} hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none ${card.styles.ring}`}
              >
                {card.btn}
              </button>
            </div>
            <div className={`mt-4 p-3 border rounded-xl ${card.styles.boxBg} ${card.styles.boxBorder}`}>
              <p className="text-sm text-gray-600 text-center">{card.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
