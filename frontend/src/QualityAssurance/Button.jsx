import React from "react";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <button
        onClick={() => navigate("/disease-detection")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 text-lg font-medium"
      >
        Go to Disease Detection
      </button>

      <button
        onClick={() => navigate("/freshness-detection")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 text-lg font-medium"
      >
        Go to Freshness Detection
      </button>
    </div>
  );
};

export default Button;
