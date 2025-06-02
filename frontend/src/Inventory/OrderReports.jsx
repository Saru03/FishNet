// OrderReports.js
import React, { useState, useEffect } from 'react';

const OrderReports = () => {
  const [statusReport, setStatusReport] = useState(null);
  const [dateRangeReport, setDateRangeReport] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  // Fetch initial reports data
  useEffect(() => {
    fetchStatusReport();
    fetchAnalytics();
    // Set default date range to current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    setStartDate(firstDay.toISOString().split('T')[0]);
    setEndDate(now.toISOString().split('T')[0]);
  }, []);

  const fetchStatusReport = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/inventory/orders/report/');
      if (!response.ok) throw new Error('Failed to fetch status report');
      const data = await response.json();
      setStatusReport(data);
    } catch (err) {
      setError('Failed to load status report');
      console.error(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/inventory/orders/analytics/');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Analytics fetch failed:', err);
    }
  };

  const fetchDateRangeReport = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      
      const response = await fetch(`http://127.0.0.1:8000/inventory/orders/report/by-date/?${params}`);
      if (!response.ok) throw new Error('Failed to fetch date range report');
      const data = await response.json();
      setDateRangeReport(data);
      setError('');
    } catch (err) {
      setError('Failed to load date range report');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 to-blue-200 pt-4 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">📊 Order Reports & Analytics</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statusReport?.summary && (
            <>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
                <p className="text-3xl font-bold text-blue-600">{statusReport.summary.total_orders}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed</h3>
                <p className="text-3xl font-bold text-green-600">{statusReport.summary.completed_orders}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending</h3>
                <p className="text-3xl font-bold text-yellow-600">{statusReport.summary.pending_orders}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Completion Rate</h3>
                <p className="text-3xl font-bold text-purple-600">{statusReport.summary.completion_rate}%</p>
              </div>
            </>
          )}
        </div>

        {/* Analytics Card */}
        {analytics && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">📈 Monthly Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-600">This Month ({analytics.month_name})</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.current_month_orders}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Last Month</p>
                <p className="text-2xl font-bold text-gray-600">{analytics.last_month_orders}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Growth</p>
                <p className={`text-2xl font-bold ${analytics.growth_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.growth_percentage >= 0 ? '+' : ''}{analytics.growth_percentage}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Date Range Filter */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">📅 Orders by Date Range</h3>
          <div className="flex flex-wrap gap-4 items-end mb-6">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-3 border rounded-lg focus:outline-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-3 border rounded-lg focus:outline-blue-400"
              />
            </div>
            <button
              onClick={fetchDateRangeReport}
              disabled={loading}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : '🔍 Generate Report'}
            </button>
          </div>

          {/* Date Range Results */}
          {dateRangeReport && (
            <div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Report for: {dateRangeReport.date_range}
                </h4>
                <p className="text-gray-600">Total Orders: <span className="font-bold">{dateRangeReport.total_orders}</span></p>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-left border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Order Date</th>
                      <th className="p-3">Delivery Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dateRangeReport.orders && dateRangeReport.orders.length > 0 ? (
                      dateRangeReport.orders.map((order) => (
                        <tr key={order.id} className="border-t hover:bg-gray-50">
                          <td className="p-3">#{order.id}</td>
                          <td className="p-3">{order.customer_name}</td>
                          <td className="p-3">{formatDate(order.orderDate)}</td>
                          <td className="p-3">{formatDate(order.deliveryDate)}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-3">
                            {order.items ? order.items.length : 0} items
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-3 text-center text-gray-500">
                          No orders found for selected date range
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderReports;