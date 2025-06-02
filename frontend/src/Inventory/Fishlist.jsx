import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';

const FishList = () => {
  // State for fish data
  const [fishItems, setFishItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // State for toggling which row is expanded
  const [expandedFishId, setExpandedFishId] = useState(null);

  // States for adding new fish
  const [formData, setFormData] = useState({
    fishName: '',
    quantity: '',
    price: '',
    category: 'Saltwater',
    cold_storage: '',
  });

  // States for editing/deleting
  const [currentFish, setCurrentFish] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: 'Saltwater',
    quantity: '',
    price: '',
    cold_storage: '',
  });

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/inventory/fishstock/')
      .then(res => res.json())
      .then(data => {
        setFishItems(data);
        const lowStock = data.filter(fish => fish.quantity < fish.low_stock_threshold);
        setLowStockItems(lowStock);
        if (lowStock.length > 0) setShowPopup(true);
      })
      .catch(err => console.error('Failed to fetch fish stock:', err));
  };

  useEffect(() => { fetchData(); }, []);

  // Handlers for adding new fish
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFish = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.fishName,
      category: formData.category,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      description: '',
      cold_storage: formData.cold_storage.trim() || 'Default Storage',
      low_stock_threshold: 10,
      date_added: new Date().toISOString().split('T')[0],
    };
    fetch('http://127.0.0.1:8000/inventory/fishstock/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(newFish => {
        setFishItems(prev => [...prev, newFish]);
        if (newFish.quantity < newFish.low_stock_threshold) {
          setLowStockItems(prev => [...prev, newFish]);
          setShowPopup(true);
        }
        setFormData({ fishName: '', quantity: '', price: '', category: 'Saltwater', cold_storage: '' });
      })
      .catch(err => console.error('Failed to add fish:', err));
  };

  // Handle row click to toggle edit card
  const handleRowClick = (fish) => {
    if (expandedFishId === fish.id) {
      setExpandedFishId(null);
    } else {
      setExpandedFishId(fish.id);
      setCurrentFish(fish);
      setEditFormData({
        name: fish.name,
        category: fish.category,
        quantity: fish.quantity,
        price: fish.price,
        cold_storage: fish.cold_storage,
      });
    }
  };

  // Handle input change in edit form
  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = (fishId) => {
    fetch(`http://127.0.0.1:8000/inventory/fishstock/${fishId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editFormData.name,
        category: editFormData.category,
        quantity: parseInt(editFormData.quantity),
        price: parseFloat(editFormData.price),
        cold_storage: editFormData.cold_storage,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update');
        return res.json();
      })
      .then(updatedFish => {
        setFishItems(prev => prev.map(f => (f.id === fishId ? updatedFish : f)));
        setExpandedFishId(null);
      })
      .catch(err => console.error('Update error:', err));
  };

  const handleDelete = (fishId) => {
    fetch(`http://127.0.0.1:8000/inventory/fishstock/${fishId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setFishItems(prev => prev.filter(f => f.id !== fishId));
        if (expandedFishId === fishId) setExpandedFishId(null);
      })
      .catch(err => console.error('Failed to delete fish:', err));
  };
  const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 pt-4 pb-12 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🐟 Fish Stock</h2>

        {/* Add Fish Form */}
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
          {/* Category Radio Buttons */}
          <div className="md:col-span-3 flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                value="Saltwater"
                checked={formData.category === 'Saltwater'}
                onChange={handleChange}
              />
              Saltwater
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                value="Freshwater"
                checked={formData.category === 'Freshwater'}
                onChange={handleChange}
              />
              Freshwater
            </label>
          </div>
          {/* Cold Storage */}
          <input
            type="text"
            name="cold_storage"
            value={formData.cold_storage}
            onChange={handleChange}
            placeholder="Cold Storage (optional)"
            className="md:col-span-3 p-3 border rounded"
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-1 md:col-span-3 bg-teal-600 text-white py-3 rounded hover:bg-teal-700 transition flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} /> Add Fish
          </button>
        </form>

        {/* Fish Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow mb-8">
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
              {fishItems.map((fish) => (
                <React.Fragment key={fish.id}>
                  {/* Row: toggles expand */}
                  <tr
                    className={`border-t cursor-pointer hover:bg-gray-50 ${
                      fish.quantity < fish.low_stock_threshold ? 'bg-red-50' : ''
                    }`}
                    onClick={() => handleRowClick(fish)}
                  >
                    <td className="p-3">{fish.name}</td>
                    <td className="p-3">{fish.category}</td>
                    <td className="p-3">{fish.quantity}</td>
                    <td className="p-3">₹{fish.price}</td>
                    <td className="p-3">{fish.cold_storage}</td>
                    <td className="p-3">{formatDate(fish.date_added)}</td>
                    <td className="p-3 flex space-x-2"></td>
                  </tr>
                  {/* Show edit card if this fish is expanded */}
                  {expandedFishId === fish.id && (
                    <tr>
                      <td colSpan={7} className="p-0">
                        {/* Overlay background with blur */}
                        <div
                          className="modal-overlay"
                          onClick={() => setExpandedFishId(null)}
                        >
                          <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Editable form */}
                            <h3 className="text-xl font-semibold mb-4">🐠 Edit {fish.name}</h3>
                            <div className="space-y-2">
                              <div>
                                <label className="block mb-1 font-semibold">Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  value={editFormData.name}
                                  onChange={handleInputChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                              <div>
                                <label className="block mb-1 font-semibold">Category</label>
                                <input
                                  type="text"
                                  name="category"
                                  value={editFormData.category}
                                  onChange={handleInputChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                              <div>
                                <label className="block mb-1 font-semibold">Quantity</label>
                                <input
                                  type="number"
                                  name="quantity"
                                  value={editFormData.quantity}
                                  onChange={handleInputChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                              <div>
                                <label className="block mb-1 font-semibold">Price</label>
                                <input
                                  type="number"
                                  name="price"
                                  value={editFormData.price}
                                  onChange={handleInputChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                              <div>
                                <label className="block mb-1 font-semibold">Storage</label>
                                <input
                                  type="text"
                                  name="cold_storage"
                                  value={editFormData.cold_storage}
                                  onChange={handleInputChange}
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                            </div>
                            {/* Buttons: Save & Delete */}
                            <div className="mt-4 flex justify-end space-x-2">
                              <button
                                onClick={() => handleSave(fish.id)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => handleDelete(fish.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low stock popup */}
        {showPopup && lowStockItems.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-xl shadow max-w-xl mx-auto">
            <h3 className="text-lg font-bold mb-2">⚠️ Low Stock Alert</h3>
            <p className="mb-2">The following fish items are below their stock threshold:</p>
            <ul className="list-disc pl-5 space-y-1">
              {lowStockItems.map((fish, idx) => (
                <li key={idx}>
                  <strong>{fish.name}</strong>: {fish.quantity} (Min: {fish.low_stock_threshold})
                </li>
              ))}
            </ul>
            <div className="text-right mt-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Styles for overlay */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default FishList;