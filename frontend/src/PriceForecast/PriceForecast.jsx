import React, { useState } from 'react';

const PriceForecast = () => {
  const [fishType, setFishType] = useState('');
  const [market, setMarket] = useState('');
  const [size, setSize] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleCheck = () => {
    if (!fishType || !market || !size || !date) {
      setError('Please fill in all fields before checking the price.');
      return;
    }

    setError('');
    console.log('Data sent:', { fishType, market, size, date });
  };

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6 border border-blue-100 space-y-5">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">📊 Price Forecast</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            value={fishType}
            onChange={(e) => setFishType(e.target.value)}
            className="col-span-1 sm:col-span-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Fish Type</option>
            <option value="Indian Mackerel">Indian Mackerel</option>
            <option value="Rock Lobster">Rock Lobster</option>
            <option value="Silver Pomfret">Silver Pomfret</option>
            <option value="Indian White Prawn">Indian White Prawn</option>
            <option value="Spotted Crab">Spotted Crab</option>
            <option value="Indo pacific Seer Fish">Indo pacific Seer Fish</option>
            <option value="Johns Snapper">Johns Snapper</option>
          </select>

          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="col-span-1 sm:col-span-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Market</option>
            <option value="Mohanpura Modern Fish Market">Mohanpura Modern Fish Market</option>
            <option value="Venlok Fish Market">Venlok Fish Market</option>
            <option value="Vishakhapatnam Municipal Wholesale Fish Market">Vishakhapatnam Municipal Wholesale Fish Market</option>
            <option value="Ghoghla Retail Fish Market">Ghoghla Retail Fish Market</option>
            <option value="Vanakbara Retail Fish Market">Vanakbara Retail Fish Market</option>
            <option value="Mapusa Fish Market">Mapusa Fish Market</option>
            <option value="SGDPA Wholesale Fish Market">SGDPA Wholesale Fish Market</option>
            <option value="Madikeri Retail Fish Market">Madikeri Retail Fish Market</option>
            <option value="Padubidri Retail Fish Market">Padubidri Retail Fish Market</option>
            <option value="Kavanad Retail Fish Market">Kavanad Retail Fish Market</option>
            <option value="Ponnani Harbour Azheekkal ">Ponnani Harbour Azheekkal </option>
            <option value="Panvel Fish Market">Panvel Fish Market</option>
            <option value="Sasoon Dock Retail Fish Market">Sasoon Dock Retail Fish Market</option>
            <option value="Naya Bazar Retail Fish Market">Naya Bazar Retail Fish Market</option>
            <option value="Unit-4 Wholesale Fish Market">Unit-4 Wholesale Fish Market</option>
            <option value="Badagada Retail Fish Market">Badagada Retail Fish Market</option>
            <option value="Chintadripet Fish Market">Chintadripet Fish Market</option>
            <option value="Kasivillangi Fish Market">Kasivillangi Fish Market</option>
            <option value="Nelpattai Fish Market">Nelpattai Fish Market</option>
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
        </div>

        <button
          onClick={handleCheck}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Forecast Price
        </button>

        {error && (
          <p className="text-red-600 text-sm text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default PriceForecast;
