import React from "react";

const About = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-50 relative overflow-hidden text-gray-800">
      
     
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-300 to-blue-400 rounded-b-full blur-2xl opacity-30 animate-pulse z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-green-300 to-blue-400 rounded-t-full blur-2xl opacity-30 animate-pulse z-0"></div>

    
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-lg">
          Welcome to FishNet 🐟💻
        </h1>

        <p className="text-xl leading-relaxed text-gray-700 mb-6">
          <span className="text-blue-600 font-semibold">FishNet</span> is your one-stop digital solution for the fishing industry. From disease detection to price forecasting, we’re making the ocean smarter 🌊.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 mb-8">
          Designed for fishermen, traders, and researchers — we blend Machine Learning, smart data, and intuitive UI to help streamline the seafood supply chain with just a few clicks.
        </p>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-10 border-l-4 border-blue-500 hover:border-green-500 transition-all duration-300">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">⚡ What We Offer</h2>
          <ul className="text-left list-disc list-inside text-lg space-y-2">
            <li>🎣 AI-Powered Fish Disease Detection</li>
            <li>🧪 Freshness Evaluation System</li>
            <li>📈 Price Forecasting Based on Market Trends</li>
            <li>🌐 Compare Prices Across Multiple Markets</li>
            <li>💼 Inventory & Logistics Support</li>
          </ul>
        </div>

        <p className="text-lg text-gray-600 mt-6 italic">
          <span className="font-semibold text-green-700">Tech Stack:</span> React, Tailwind CSS, Django, Python, ML, and ocean love 🐬.
        </p>
      </div>
    </div>
  );
};

export default About;
