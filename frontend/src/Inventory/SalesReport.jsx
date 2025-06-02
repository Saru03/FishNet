import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Fish, DollarSign, ShoppingCart, BarChart3, RefreshCw } from 'lucide-react';

const SalesReport = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start_date: '',
    end_date: ''
  });

  const fetchReportData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (dateRange.start_date) params.append('start_date', dateRange.start_date);
      if (dateRange.end_date) params.append('end_date', dateRange.end_date);
      
      const response = await fetch(`http://127.0.0.1:8000/inventory/sales-report/?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch sales report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterSubmit = () => {
    fetchReportData();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading sales report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <h3 className="font-bold text-lg mb-2">Error Loading Report</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Sales Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into your fish sales performance</p>
        </div>

        {/* Date Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={dateRange.start_date}
                onChange={handleDateChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={dateRange.end_date}
                onChange={handleDateChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleFilterSubmit}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Apply Filter
            </button>
            <button
              onClick={() => {
                setDateRange({ start_date: '', end_date: '' });
                setTimeout(fetchReportData, 100);
              }}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              Clear
            </button>
          </div>
        </div>

        {reportData && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(reportData.summary.total_revenue)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sales</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {reportData.summary.total_sales}
                    </p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Items Sold</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {reportData.summary.total_items_sold}
                    </p>
                  </div>
                  <Fish className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Sale Value</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(reportData.summary.average_sale_value)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Best Selling Items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Best Selling Items
                </h3>
                <div className="space-y-4">
                  {reportData.best_selling_items.map((item, index) => (
                    <div key={item.fish__id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-800">{item.fish__name}</p>
                          <p className="text-sm text-gray-600">{item.sales_count} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">{item.total_quantity} units</p>
                        <p className="text-sm text-gray-600">{formatCurrency(item.total_revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Sales */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-green-600" />
                  Recent Sales
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {reportData.recent_sales.map((sale) => (
                    <div key={sale.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-gray-800">
                          {sale.customer_name || 'Manual Sale'}
                        </p>
                        <p className="text-sm text-gray-600">{formatDate(sale.saleDate)}</p>
                      </div>
                      <div className="space-y-1">
                        {sale.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.fishName} × {item.quantity}
                            </span>
                            <span className="font-medium">{formatCurrency(item.revenue)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Sales Trend */}
            {reportData.daily_sales_trend.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  Daily Sales Trend
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items Sold
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportData.daily_sales_trend.map((day) => (
                        <tr key={day.day} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatDate(day.day)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.daily_sales_count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.daily_items_sold || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {formatCurrency(day.daily_revenue || 0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SalesReport;