import React, { useState } from 'react';

const FishMarketComparator = () => {
  const [fishType, setFishType] = useState('');
  const [market, setMarket] = useState('');
  const [size, setSize] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleCompare = () => {
    if (!fishType || !market || !size || !date || !location) {
      setError('Please fill in all fields before comparing markets.');
      return;
    }

    setError('');
    console.log('Fish Market Comparator Input:', {
      fishType, market, size, date, location
    });
  };

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6 border border-blue-100 space-y-5">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">📉 Fish Market Comparator</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            value={fishType}
            onChange={(e) => setFishType(e.target.value)}
            className="col-span-1 sm:col-span-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Fish Type</option>
            <option value="Rohu">Rohu</option>
            <option value="Catla">Catla</option>
            <option value="Common Carp">Common Carp</option>
            <option value="Grass Corp">Grass Carp</option>
            <option value="RoopChand">RoopChand</option>
            <option value="Pangas CatFish">Pangas Catfish</option>
          </select>

          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="col-span-1 sm:col-span-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Market</option>
            <option value="DDA Market">DDA Market</option>
            <option value="Ghazipur Market">Ghazipur Market</option>
            <option value="Barnala Market">Barnala Market</option>
            <option value="Ludiana Market">Ludiana Market</option>
            <option value="Sunam Dhuri Market">Sunam Dhuri Market</option>
            <option value="Amritsar Market">Amritsar Market</option>
            <option value="Faridabad Market">Faridabad Market</option>
            <option value="Yamuna Nagar Market">Yamuna Nagar Market</option>
            <option value="Macchwatoli Retail Fish Market">Macchwatoli Market</option>
            <option value="Mushallapur Wholesale Market">Mushallapur Market</option>
          </select>

          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Fish Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="text"
            placeholder="Your Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="col-span-1 sm:col-span-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button
          onClick={handleCompare}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Compare Market Prices
        </button>

        {error && (
          <p className="text-red-600 text-sm text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default FishMarketComparator;
