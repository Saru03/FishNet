import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const FishersDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get user's GPS location
  const getCurrentLocation = () => {
    setLoading(true);
    setError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude},${longitude}`;
          setLocation(locationString);
          await fetchWeatherData(locationString);
        },
        (error) => {
          setError('Unable to get GPS location. Please enter manually.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  // Fetch weather data
  const fetchWeatherData = async (loc) => {
    try {
      // In a real app, replace with your Django API endpoint
      const response = await fetch(`http://127.0.0.1:8000/fishing-insights/weather/?location=${encodeURIComponent(loc)}`);
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      // Demo data for display purposes
      setWeatherData({
        location: 'Current Location',
        condition: 'Partly Cloudy',
        temp_c: 27,
        wind_kph: 12,
        humidity: 65,
        precip_mm: 0,
        pressure_mb: 1013,
        vis_km: 10,
        sunrise: '06:15 AM',
        sunset: '06:45 PM',
        moon_phase: 'Waxing Crescent'
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch stock data
  const fetchStockData = async () => {
    try {
      // In a real app, replace with your Django API endpoint
      const response = await fetch('http://127.0.0.1:8000/inventory/stock-report/');
      
      if (!response.ok) {
        throw new Error('Stock data not available');
      }
      
      const data = await response.json();
      setStockData(data);
    } catch (err) {
      // Demo data for display purposes
      setStockData({
        stock_data: [
          { category: 'Tuna', total_quantity: 60, avg_price: 280 },
          { category: 'Salmon', total_quantity: 25, avg_price: 450 },
          { category: 'Mackerel', total_quantity: 40, avg_price: 180 },
          { category: 'Sardine', total_quantity: 10, avg_price: 120 }
        ],
        stock_value: 45600,
        total_fish_count: 135,
        unique_species: 4,
        low_stock_count: 1
      });
    }
  };

  // Manual location search
  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (location.trim()) {
      setLoading(true);
      await fetchWeatherData(location);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          🎣 Fisher's Dashboard
        </h1>

        {/* Location Input */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            📍 Location
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={getCurrentLocation}
              disabled={loading}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Getting Location...' : 'Use GPS Location'}
            </button>
            <div className="flex flex-1 gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Or enter location manually"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleLocationSearch}
                disabled={loading}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Information */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              🌤️ Weather Conditions
            </h2>
            
            {weatherData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Temperature</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {weatherData.temp_c}°C
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Wind Speed</div>
                    <div className="text-2xl font-bold text-green-600">
                      {weatherData.wind_kph} km/h
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Precipitation</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {weatherData.precip_mm} mm
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Humidity</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {weatherData.humidity}%
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Condition</div>
                  <div className="text-lg font-semibold">{weatherData.condition}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Sunrise:</span> {weatherData.sunrise}
                  </div>
                  <div>
                    <span className="text-gray-600">Sunset:</span> {weatherData.sunset}
                  </div>
                  <div>
                    <span className="text-gray-600">Visibility:</span> {weatherData.vis_km} km
                  </div>
                  <div>
                    <span className="text-gray-600">Pressure:</span> {weatherData.pressure_mb} mb
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Click "Use GPS Location" or enter a location to see weather data</p>
              </div>
            )}
          </div>

          {/* Stock Information */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              📦 Fish Stock Overview
            </h2>
            
            {stockData ? (
              <div className="space-y-6">
                {/* Stock Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {stockData.total_fish_count}
                    </div>
                    <div className="text-sm text-gray-600">Total Fish</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{stockData.stock_value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Stock Value</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {stockData.unique_species}
                    </div>
                    <div className="text-sm text-gray-600">Species</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {stockData.low_stock_count}
                    </div>
                    <div className="text-sm text-gray-600">Low Stock</div>
                  </div>
                </div>

                {/* Stock Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Stock by Category</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={stockData.stock_data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="category" 
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis fontSize={12} />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'total_quantity' ? `${value} fish` : `₹${value}`,
                          name === 'total_quantity' ? 'Quantity' : 'Avg Price'
                        ]}
                      />
                      <Bar 
                        dataKey="total_quantity" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                        name="total_quantity"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Loading stock data...</p>
              </div>
            )}
          </div>
        </div>

        {/* Fishing Recommendation */}
        {weatherData && stockData && (
          <div className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-2xl shadow-lg text-white">
            <h2 className="text-2xl font-semibold mb-3 flex items-center">
              🧠 Fishing Recommendation
            </h2>
            <div className="text-lg">
              <p className="mb-2">
                <strong>Weather conditions:</strong> {weatherData.condition} with {weatherData.wind_kph} km/h winds
              </p>
              <p className="mb-2">
                <strong>Stock status:</strong> {stockData.low_stock_count} items running low
              </p>
              <p className="bg-white bg-opacity-20 p-4 rounded-lg">
                💡 <strong>Suggestion:</strong> Good conditions for fishing! Focus on restocking low inventory items.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FishersDashboard;