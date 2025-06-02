import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Fish, DollarSign, Package } from 'lucide-react';

const StockReport = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/inventory/stock-report/');
      if (!response.ok) {
        throw new Error('Failed to fetch report data');
      }
      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 pt-4 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading report...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 pt-4 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error loading report: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 pt-4 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <BarChart3 className="text-teal-600" size={32} />
            📊 Stock Report
          </h1>
          <button
            onClick={fetchReportData}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Refresh Report
          </button>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Stock Value */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stock Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{reportData.stock_value.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          {/* Total Fish Count */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fish Count</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.total_fish_count.toLocaleString()}</p>
              </div>
              <Fish className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          {/* Unique Species */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Species</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.unique_species}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">{reportData.low_stock_count}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Stock by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-teal-600" size={20} />
              Stock by Category
            </h2>
            <div className="space-y-4">
              {reportData.stock_data.map((category, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">{category.category}</h3>
                    <span className="text-sm text-gray-500">{category.total_items} items</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Quantity:</span>
                      <span className="font-medium ml-2">{category.total_quantity}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Avg Price:</span>
                      <span className="font-medium ml-2">₹{parseFloat(category.avg_price).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Valuable Items */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="text-green-600" size={20} />
              Top 5 Most Valuable Items
            </h2>
            <div className="space-y-3">
              {reportData.top_valuable_items.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-teal-100 text-teal-600 rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{(item.quantity * item.price).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{item.quantity} × ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alert Section */}
        {reportData.low_stock_items.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} />
              ⚠️ Low Stock Alerts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportData.low_stock_items.map((item) => (
                <div key={item.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-medium">Current: {item.quantity}</span>
                    <span className="text-gray-600 text-sm">Min: {item.low_stock_threshold}</span>
                  </div>
                  <div className="mt-2 bg-red-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${Math.min((item.quantity / item.low_stock_threshold) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockReport;