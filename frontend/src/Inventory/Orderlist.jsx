import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    fishName: '',
    quantity: '',
    orderDate: ''
  });

  const navigate = useNavigate();

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
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 Order List</h2>

        {/* Form stays white */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="fishName" 
              value={formData.fishName} 
              onChange={handleChange} 
              placeholder="Fish Name" 
              required 
              className="p-3 border rounded-lg focus:outline-blue-400" 
            />
            <input 
              type="number" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange} 
              placeholder="Quantity" 
              required 
              className="p-3 border rounded-lg" 
            />
            <input 
              type="date" 
              name="orderDate" 
              value={formData.orderDate} 
              onChange={handleChange} 
              required 
              className="p-3 border rounded-lg" 
            />
            <button 
              type="submit" 
              className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              ➕ Add Order
            </button>
          </form>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Fish</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{order.fishName}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.orderDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <button onClick={() => navigate('/inventory')} className="bg-gray-600 text-white py-2 px-5 rounded-lg hover:bg-gray-700">🔙 Inventory</button>
          <button onClick={() => navigate('/saleslist')} className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700">➡️ Sales</button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
