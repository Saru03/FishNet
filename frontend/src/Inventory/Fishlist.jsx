import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LowStockPopup = ({ isAuthenticated, lowStockItems }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div className="text-center mb-6">
      <button
        onClick={togglePopup}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow"
      >
        📦 Check Your Stock
      </button>

      {showPopup && (
        <div className="mt-4 p-4 bg-white rounded-xl shadow max-w-md mx-auto">
          {!isAuthenticated ? (
            <>
              <p className="mb-4 font-semibold">Please login or signup to check stock details</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900 transition"
                >
                  🔐 Already a user? Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                >
                  ✍️ New to FishNet? Register
                </button>
              </div>
            </>
          ) : (
            <>
              {lowStockItems.length > 0 ? (
                <div className="bg-yellow-200 text-red-800 font-bold p-4 rounded-xl shadow">
                  ⚠️ Low Stock Alert: You have {lowStockItems.length} fish item(s) below stock threshold!
                </div>
              ) : (
                <p className="font-semibold">All your stocks look good! No low stock items.</p>
              )}
            </>
          )}

          <button
            onClick={togglePopup}
            className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const FishList = () => {
  const [fishItems, setFishItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [formData, setFormData] = useState({
    fishName: '',
    quantity: '',
    price: ''
  });

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access_token');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/inventory/fishstock/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setFishItems(data);
        if (isAuthenticated) {
          const lowStock = data.filter(fish => fish.quantity < fish.low_stock_threshold);
          setLowStockItems(lowStock);
        }
      })
      .catch(err => console.error('Failed to fetch fish stock:', err));
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFish = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.fishName,
      category: 'Saltwater',
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      description: '',
      cold_storage: 'Default Storage',
      low_stock_threshold: 10,
      date_added: new Date().toISOString().split('T')[0]
    };

    fetch('http://127.0.0.1:8000/inventory/fishstock/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(newFish => {
        setFishItems(prev => [...prev, newFish]);
        if (isAuthenticated && newFish.quantity < newFish.low_stock_threshold) {
          setLowStockItems(prev => [...prev, newFish]);
        }
        setFormData({ fishName: '', quantity: '', price: '' });
      })
      .catch(err => console.error('Failed to add fish:', err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🐟 Fish Inventory</h2>

        {/* LowStockPopup Button & Popup */}
        <LowStockPopup isAuthenticated={isAuthenticated} lowStockItems={lowStockItems} />

        {/* 🐠 Add Fish Form */}
        <form
          onSubmit={handleAddFish}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white shadow p-6 rounded-xl mb-8"
        >
          <input
            type="text"
            name="fishName"
            value={formData.fishName}
            onChange={handleChange}
            placeholder="Fish Name"
            required
            className="p-3 border rounded"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="p-3 border rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price per Fish (₹)"
            required
            className="p-3 border rounded"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-3 bg-teal-600 text-white py-3 rounded hover:bg-teal-700 transition flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} /> Add Fish
          </button>
        </form>

        {/* 📋 Fish Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Price (₹)</th>
                <th className="p-3">Storage</th>
                <th className="p-3">Date Added</th>
              </tr>
            </thead>
            <tbody>
              {fishItems.map((fish, index) => (
                <tr
                  key={index}
                  className={`border-t hover:bg-gray-50 ${
                    fish.quantity < fish.low_stock_threshold ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="p-3">{fish.name}</td>
                  <td className="p-3">{fish.category}</td>
                  <td className="p-3">{fish.quantity}</td>
                  <td className="p-3">₹{fish.price}</td>
                  <td className="p-3">{fish.cold_storage}</td>
                  <td className="p-3">{fish.date_added}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FishList;
