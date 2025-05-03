import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ClipboardList, ShoppingCart } from 'lucide-react';

const Fishlist = () => {
  const [fishItems, setFishItems] = useState([]);
  const [formData, setFormData] = useState({
    fishName: '',
    quantity: '',
    price: ''
  });

  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-xl mt-8">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-6 flex items-center justify-center gap-2">
          <ClipboardList className="w-6 h-6" /> Fish Inventory
        </h2>

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

        <table className="w-full text-left text-sm border-collapse mb-6">
          <thead className="bg-blue-200 text-blue-700">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Fish Name</th>
              <th className="p-3">Quantity (kg)</th>
              <th className="p-3">Price (₹)</th>
              <th className="p-3">Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {fishItems.map((item) => (
              <tr key={item.id} className="border-t hover:bg-blue-50">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.fishName}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">₹{item.price}</td>
                <td className="p-3">₹{totalPrice(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={() => navigate('/orderlist')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" /> Go to Order List
          </button>
          <button
            onClick={() => navigate('/saleslist')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <ClipboardList className="w-5 h-5" /> Go to Sales List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fishlist;
