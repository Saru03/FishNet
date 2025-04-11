import React from "react";
import { useNavigate } from "react-router-dom";

const QualityAssurance = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16 px-4 bg-gradient-to-b from-white to-blue-100 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-blue-700 mb-10 text-center">
        🧪 Quality Assurance
      </h2>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => navigate("/disease-detection")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-md transition duration-300 text-lg font-medium"
        >
          Disease Detection
        </button>

        <button
          onClick={() => navigate("/freshness-detection")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg shadow-md transition duration-300 text-lg font-medium"
        >
          Freshness Detection
        </button>
      </div>
    </div>
  );
};

export default QualityAssurance;
