// Home.jsx
import React from "react";
import Button from "../QualityAssurance/Button"; // make sure path is correct

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome to FishNet</h1>
      <p className="text-center mb-10 text-gray-600">Choose an option to get started:</p>
      <Button />
    </div>
  );
};

export default Home;
