import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForecastSections = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Forecast Sections</h1>

      <div className="grid gap-6">
        <button
          onClick={() => navigate('/price-forecast')}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl text-lg hover:bg-blue-700 shadow"
        >
          Price Prediction
        </button>

        <button
          onClick={() => navigate('/market-price-prediction')}
          className="w-full bg-green-600 text-white py-4 px-6 rounded-xl text-lg hover:bg-green-700 shadow"
        >
          Market Price Prediction
        </button>

        <button
          onClick={() => navigate('/fish-market-comparator')}
          className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl text-lg hover:bg-purple-700 shadow"
        >
          Market Price Comparator
        </button>
      </div>
    </div>
  );
};

export default ForecastSections;
