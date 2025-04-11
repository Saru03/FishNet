
import React from "react";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-6">
      <button
        onClick={() => navigate("/quality-assurance")}
        className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md text-lg"
      >
        Quality Assurance
      </button>

      <button
        onClick={() => navigate("/forecast")}
        className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md text-lg"
      >
        Price Forecast
      </button>
    </div>
  );
};

export default Button;
