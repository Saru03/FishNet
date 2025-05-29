{/*import React, { useState } from 'react';

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

export default OrderList;*/}
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [fishList, setFishList] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [orderItems, setOrderItems] = useState([{ fish_id: '', quantity: '' }]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/inventory/orders/')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));

    fetch('http://127.0.0.1:8000/inventory/fishstock/')
      .then(res => res.json())
      .then(data => setFishList(data))
      .catch(err => console.error('Error fetching fish list:', err));
  }, []);

  const handleDateChange = (e) => setDeliveryDate(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleAddItem = () => {
    setOrderItems([...orderItems, { fish_id: '', quantity: '' }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...orderItems];
    newItems[index][field] = value;
    setOrderItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!deliveryDate) {
      alert("Please select a delivery date");
      return;
    }

    for (let item of orderItems) {
      if (!item.fish_id || !item.quantity || item.quantity <= 0) {
        alert("Please select fish and quantity for all items");
        return;
      }
    }

    const payload = {
      deliveryDate,
      status,
      item_details: orderItems.map(item => ({
        fish_id: parseInt(item.fish_id),
        quantity: parseInt(item.quantity),
      })),
    };

    fetch('http://127.0.0.1:8000/inventory/orders/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add order');
        return res.json();
      })
      .then(newOrder => {
        setOrders(prev => [...prev, newOrder]);
        setDeliveryDate('');
        setStatus('pending');
        setOrderItems([{ fish_id: '', quantity: '' }]);
      })
      .catch(async err => {
        const errorText = await err.text();
        console.error('Error:', errorText);
        alert("Failed to add order. Check console for details.");
      });
  };

  const handleConvertOrderToSale = (orderId) => {
    fetch(`http://127.0.0.1:8000/orders/${orderId}/convert-to-sale/`, {
      method: 'POST',
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => { throw new Error(e.error || 'Failed to convert'); });
        }
        return res.json();
      })
      .then(data => {
        alert(`Order converted to sale successfully! Sale ID: ${data.id}`);
        setOrders(prev => prev.filter(order => order.id !== orderId));
        navigate('/saleslist');
      })
      .catch(error => {
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-200 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 Order List</h2>

        {/* Add Order Form */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Delivery Date</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={handleDateChange}
                required
                className="p-3 border rounded-lg focus:outline-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Status</label>
              <select
                value={status}
                onChange={handleStatusChange}
                className="p-3 border rounded-lg"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="col-span-2">
              <h3 className="text-xl font-semibold mb-2">Order Items</h3>
              {orderItems.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <select
                    value={item.fish_id}
                    onChange={(e) => handleItemChange(index, 'fish_id', e.target.value)}
                    required
                    className="p-2 border rounded w-1/2"
                  >
                    <option value="">Select Fish</option>
                    <option value="Indian Mackerel">Indian Mackerel</option>
                    <option value="Rock Lobster">Rock Lobster</option>
                    <option value="Silver Pomfret">Silver Pomfret</option>
                    <option value="Indian White Prawn">Indian White Prawn</option>
                    <option value="Spotted Crab">Spotted Crab</option>
                    <option value="Indo pacific Seer Fish">Indo pacific Seer Fish</option>
                    <option value="Johns Snapper">Johns Snapper</option>
                    {fishList.map(fish => (
                      <option key={fish.id} value={fish.id}>{fish.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Quantity"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    required
                    className="p-2 border rounded w-1/2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddItem}
                className="mt-2 px-3 py-1 bg-gray-300 rounded"
              >
                ➕ Add Item
              </button>
            </div>

            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                ➕ Add Order
              </button>
            </div>
          </form>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow mb-8">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Fish</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Delivery Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) =>
                  (order.items || []).map((item, idx) => (
                    <tr key={`${order.id}-${idx}`} className="border-t hover:bg-gray-50">
                      <td className="p-3">{item.fishName || 'Unknown'}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">{order.orderDate}</td>
                      <td className="p-3">{order.deliveryDate}</td>
                      <td className="p-3">{order.status}</td>
                      <td className="p-3">
                        {order.status === 'completed' && (
                          <button
                            onClick={() => handleConvertOrderToSale(order.id)}
                            className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                          >
                            Move to Sale
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => navigate('/inventory')}
            className="bg-gray-600 text-white py-2 px-5 rounded-lg hover:bg-gray-700"
          >
            🔙 Inventory
          </button>
          <button
            onClick={() => navigate('/saleslist')}
            className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700"
          >
            🛒 Move to Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
