import React, { useState } from 'react';

const MarketPricePrediction = () => {
  const [fishType, setFishType] = useState('');
  const [market, setMarket] = useState('');
  const [size, setSize] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleCheck = () => {
    if (!fishType || !market || !size || !date) {
      setError('Please fill in all fields before predicting.');
      return;
    }

    setError('');
    console.log('Market Price Prediction Input:', {
      fishType,
      market,
      size,
      date,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9ff] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-5">
        <h2 className="text-center text-2xl font-bold text-blue-700 flex items-center justify-center gap-2">
          📈 Market Price Predictor
        </h2>

        <select
          className="w-full border border-gray-300 rounded-lg p-3"
          value={fishType}
          onChange={(e) => setFishType(e.target.value)}
        >
          <option value="">Select Fish Type</option>
          <option value="Rohu">Rohu</option>
          <option value="Catla">Catla</option>
          <option value="Common Carp">Common Carp</option>
          <option value="Grass Carp">Grass Carp</option>
          <option value="RoopChand">RoopChand</option>
          <option value="Pangas Catfish">Pangas Catfish</option>
        </select>

        <select
          className="w-full border border-gray-300 rounded-lg p-3"
          value={market}
          onChange={(e) => setMarket(e.target.value)}
        >
          <option value="">Select Market</option>
          <option value="DDA Market">DDA Market</option>
          <option value="Ghazipur Market">Ghazipur Market</option>
          <option value="Barnala Market">Barnala Market</option>
          <option value="Ludhiana Market">Ludhiana Market</option>
          <option value="Sunam Dhuri Market">Sunam Dhuri Market</option>
          <option value="Amritsar Market">Amritsar Market</option>
          <option value="Faridabad Market">Faridabad Market</option>
          <option value="Yamuna Nagar Market">Yamuna Nagar Market</option>
          <option value="Macchwatoli Market">Macchwatoli Market</option>
          <option value="Mushallapur Market">Mushallapur Market</option>
          <option value="Saidnagar Market">Saidnagar Market</option>
          <option value="Bhakra Sagar Center">Bhakra Sagar Center</option>
          <option value="Nagrota Center">Nagrota Center</option>
          <option value="Shimla Retail">Shimla Retail</option>
          <option value="Jaipur Market">Jaipur Market</option>
          <option value="Udaipur Market">Udaipur Market</option>
          <option value="Lucknow Market">Lucknow Market</option>
          <option value="Gorakhpur Market">Gorakhpur Market</option>
          <option value="Krishi Mandi">Krishi Mandi</option>
        </select>

        <div className="flex gap-2">
          <select
            className="w-1/2 border border-gray-300 rounded-lg p-3"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Fish Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <input
            type="date"
            className="w-1/2 border border-gray-300 rounded-lg p-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="dd-mm-yyyy"
          />
        </div>

        <button
          onClick={handleCheck}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Predict Market Price
        </button>

        {error && (
          <div className="text-red-600 text-center text-sm font-medium">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPricePrediction;
