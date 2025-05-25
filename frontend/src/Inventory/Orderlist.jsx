import React, { useState } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    fishName: '',
    quantity: '',
    orderDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      ...formData
    };
    setOrders([...orders, newOrder]);
    setFormData({ fishName: '', quantity: '', orderDate: '' });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-200 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          📦 Order List
        </h2>

        {/* Form stays white with cool hover effects */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="fishName"
              value={formData.fishName}
              onChange={handleChange}
              placeholder="Fish Name"
              required
              className="p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
              className="p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              required
              className="p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 flex justify-center items-center gap-2"
            >
              ➕ Add Order
            </button>
          </form>
        </div>

        {/* Order Statistics Card */}
        <div className="flex gap-6 mb-8">
          <div className="bg-indigo-100 p-6 rounded-xl shadow-md w-full flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-indigo-700">Total Orders</h3>
              <p className="text-2xl font-semibold text-gray-800">{orders.length}</p>
            </div>
            <div className="text-indigo-600 text-4xl">📦</div>
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow-md w-full flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-green-700">Total Quantity</h3>
              <p className="text-2xl font-semibold text-gray-800">
                {orders.reduce((acc, curr) => acc + parseInt(curr.quantity), 0)} kg
              </p>
            </div>
            <div className="text-green-600 text-4xl">🐟</div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-blue-200 text-blue-800">
              <tr>
                <th className="p-4">Fish</th>
                <th className="p-4">Qty</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-blue-50 transition-all duration-300">
                  <td className="p-4">{order.fishName}</td>
                  <td className="p-4">{order.quantity}</td>
                  <td className="p-4">{order.orderDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
