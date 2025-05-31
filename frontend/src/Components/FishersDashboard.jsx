import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Dummy Data
const demandData = [
  { day: "Mon", demand: 120 },
  { day: "Tue", demand: 200 },
  { day: "Wed", demand: 170 },
  { day: "Thu", demand: 240 },
  { day: "Fri", demand: 180 },
  { day: "Sat", demand: 300 },
  { day: "Sun", demand: 250 },
];

const stockData = [
  { fish: "Tuna", stock: 60 },
  { fish: "Salmon", stock: 25 },
  { fish: "Mackerel", stock: 40 },
  { fish: "Sardine", stock: 10 },
];

const FishersDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🎣 Fisher's Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PFZ Tile */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">🗺️ Today's Fishing Zone</h2>
          <p className="text-gray-600">High potential around Bay Area. Tap map for full view.</p>
        </div>

        {/* Weather Tile */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">🌤️ Weather Update</h2>
          <p className="text-gray-600">Tides: Medium | Wind: 12 km/h | Temp: 27°C</p>
        </div>

        {/* Demand Chart */}
        <div className="bg-white p-4 rounded-2xl shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">📈 Weekly Fish Demand</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={demandData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Chart */}
        <div className="bg-white p-4 rounded-2xl shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">📦 Current Fish Stock</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fish" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Suggestion Tile */}
        <div className="bg-white p-4 rounded-2xl shadow col-span-1">
          <h2 className="text-xl font-semibold mb-2">🧠 AI Suggestion</h2>
          <p className="text-gray-600">Based on current market and weather, go for **Tuna** today.</p>
        </div>

        {/* Best Market Tile */}
        <div className="bg-white p-4 rounded-2xl shadow col-span-1">
          <h2 className="text-xl font-semibold mb-2">🛒 Best Selling Market</h2>
          <p className="text-gray-600">Visakhapatnam Harbor - Avg price ₹280/kg</p>
        </div>
      </div>
    </div>
  );
};

export default FishersDashboard;
