
import React from "react";
import Button from "../QualityAssurance/Button";

const Home = () => {
  return (
    <div className="min-h-screen pt-32 pb-10 px-4 bg-gradient-to-b from-white to-blue-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-blue-700 mb-4">
        Welcome to <span className="text-green-500">Fish</span><span className="text-blue-400">Net</span>
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10">
        Empowering Fisheries with Smart Technology 🐟⚙️
      </p>
      <Button />
    </div>
  );
};

export default Home;
