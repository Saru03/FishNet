{/*import React, { useState } from 'react';
import { ClipboardList, BarChart2, PlusCircle } from 'lucide-react';

const Fishlist = () => {
  const [fishItems, setFishItems] = useState([]);
  const [formData, setFormData] = useState({
    fishName: '',
    quantity: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFish = {
      id: Date.now(),
      ...formData
    };
    setFishItems([...fishItems, newFish]);
    setFormData({ fishName: '', quantity: '', price: '' });
  };

  const totalPrice = (item) => parseInt(item.quantity) * parseInt(item.price);
  const totalInventoryValue = fishItems.reduce((acc, item) => acc + totalPrice(item), 0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-xl mt-8">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-6 flex items-center justify-center gap-2">
          <ClipboardList className="w-6 h-6" /> Fish Inventory
        </h2>

        {/* Stats Box 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-indigo-100 p-5 rounded-lg shadow-md flex items-center gap-4">
            <BarChart2 className="text-indigo-600 w-10 h-10" />
            <div>
              <h4 className="text-xl font-bold text-indigo-700">Total Inventory Value</h4>
              <p className="text-lg text-gray-700 font-semibold">₹{totalInventoryValue}</p>
            </div>
          </div>
          <div className="bg-green-100 p-5 rounded-lg shadow-md flex items-center gap-4">
            <ClipboardList className="text-green-600 w-10 h-10" />
            <div>
              <h4 className="text-xl font-bold text-green-700">Total Items</h4>
              <p className="text-lg text-gray-700 font-semibold">{fishItems.length}</p>
            </div>
          </div>
        </div>

        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="fishName"
            value={formData.fishName}
            onChange={handleChange}
            placeholder="Fish Name"
            required
            className="border p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity (kg)"
            required
            className="border p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price per Kg (₹)"
            required
            className="border p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 mt-4"
          >
            <PlusCircle className="w-5 h-5" /> Add Fish
          </button>
        </form>

        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse mb-6">
            <thead className="bg-blue-200 text-blue-700">
              <tr>
                <th className="p-3">Fish Name</th>
                <th className="p-3">Quantity (kg)</th>
                <th className="p-3">Price (₹)</th>
                <th className="p-3">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {fishItems.map((item) => (
                <tr key={item.id} className="border-t hover:bg-blue-50">
                  <td className="p-3">{item.fishName}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">₹{item.price}</td>
                  <td className="p-3">₹{totalPrice(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Fishlist;*/}
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';

const FishList = () => {
  const [fishItems, setFishItems] = useState([]);
  const [formData, setFormData] = useState({
    fishName: '',
    quantity: '',
    price: ''
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/inventory/fishstock/')
      .then(res => res.json())
      .then(data => setFishItems(data))
      .catch(err => console.error('Failed to fetch fish stock:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFish = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.fishName,
      category: 'Saltwater', // static or default category
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      description: '',
      cold_storage: 'Default Storage',
      low_stock_threshold: 10,
      date_added: new Date().toISOString().split('T')[0]
    };

    fetch('http://127.0.0.1:8000/inventory/fishstock/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(newFish => {
        setFishItems(prev => [...prev, newFish]);
        setFormData({
          fishName: '',
          quantity: '',
          price: ''
        });
      })
      .catch(err => console.error('Failed to add fish:', err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🐟 Fish Inventory</h2>

        {/* Fish Entry Form */}
        <form onSubmit={handleAddFish} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white shadow p-6 rounded-xl mb-8">
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

        {/* Fish Table */}
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
                <tr key={index} className="border-t hover:bg-gray-50">
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
