import React, { useState, useEffect } from 'react';
import { PlusCircle, ArrowRight } from 'lucide-react';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [reportType, setReportType] = useState('all');
  const [showOrderList, setShowOrderList] = useState(false);
  const [fishOptions, setFishOptions] = useState([]);

  const [formData, setFormData] = useState({
    saleDate: '',
    fish_id: '',
    quantity: '',
    pricePerFish: ''
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/inventory/sales/')
      .then(res => res.json())
      .then(data => {
        setSales(data);
        setFilteredSales(data);
      })
      .catch(err => console.error('Failed to fetch sales:', err));

    fetch('http://127.0.0.1:8000/inventory/fishstock/')
      .then(res => res.json())
      .then(data => setFishOptions(data))
      .catch(err => console.error('Failed to fetch fish:', err));
  }, []);

  useEffect(() => {
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const filtered = sales.filter(sale => {
      const saleDate = new Date(sale.saleDate);
      if (reportType === 'daily') return saleDate >= startOfToday;
      if (reportType === 'weekly') return saleDate >= startOfWeek;
      if (reportType === 'monthly') return saleDate >= startOfMonth;
      return true;
    });

    setFilteredSales(filtered);
  }, [reportType, sales]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.saleDate || !formData.fish_id || !formData.quantity || !formData.pricePerFish) {
      alert('Please fill in all fields');
      return;
    }

    const payload = {
      sale_date: formData.saleDate + 'T00:00:00Z', // Add time component
      source: "manual",
      item_details: [
        {
          fish_id: parseInt(formData.fish_id),
          quantity: parseInt(formData.quantity),
          price_per_unit: parseFloat(formData.pricePerFish)
        }
      ]
    };

    console.log('Sending payload:', payload); // Debug log

    fetch('http://127.0.0.1:8000/inventory/sales/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(JSON.stringify(err));
          });
        }
        return res.json();
      })
      .then(newSale => {
        setSales([...sales, newSale]);
        setFormData({
          saleDate: '',
          fish_id: '',
          quantity: '',
          pricePerFish: ''
        });
        alert('Sale added successfully!');
      })
      .catch(err => {
        console.error('Failed to add sale:', err);
        alert('Failed to add sale: ' + err.message);
      });
  };

  const totalRevenue = filteredSales.reduce(
    (acc, sale) => acc + sale.items.reduce((sum, item) => sum + parseFloat(item.revenue), 0),
    0
  );

  if (showOrderList) return <div>OrderList Component</div>; // Placeholder

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-200 pt-4 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 Sales Records</h2>

        <div className="mb-6 flex items-center gap-4 justify-center">
          <label htmlFor="reportType" className="text-gray-700 font-semibold">
            📊 View Sales Report:
          </label>
          <select
            id="reportType"
            className="p-2 border rounded shadow-sm bg-white"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="all">All Sales</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white shadow p-6 rounded-xl mb-8">
          <input
            type="date"
            name="saleDate"
            value={formData.saleDate}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          
          {/* FIXED: Changed from text input to select dropdown */}
          <select
            name="fish_id"
            value={formData.fish_id}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          >
            <option value="">Select Fish</option>
            {fishOptions.map((fish) => (
              <option key={fish.id} value={fish.id}>
                {fish.name} (Stock: {fish.quantity})
              </option>
            ))}
          </select>
          
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="p-3 border rounded"
            min="1"
          />
          <input
            type="number"
            name="pricePerFish"
            value={formData.pricePerFish}
            onChange={handleChange}
            placeholder="Price per Fish (₹)"
            required
            className="p-3 border rounded"
            min="0"
            step="0.01"
          />
          <button
            onClick={handleSubmit}
            className="col-span-1 md:col-span-3 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} /> Add Sale
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                <th className="p-3">Customer Name</th>
                <th className="p-3">Sale Date</th>
                <th className="p-3">Fish</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Price (₹)</th>
                <th className="p-3">Revenue (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) =>
                sale.items.map((item, index) => (
                  <tr key={`${sale.id}-${item.id}`} className="border-t hover:bg-gray-50">
                    {index === 0 && (
                      <td className="p-3" rowSpan={sale.items.length}>
                        {sale.customer_name || 'Manual Sale'}
                      </td>
                    )}
                    {index === 0 && (
                      <td className="p-3" rowSpan={sale.items.length}>
                        {formatDate(sale.saleDate)}
                      </td>
                    )}
                    <td className="p-3">{item.fishName}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">₹{item.price_per_unit}</td>
                    <td className="p-3">₹{item.revenue}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="bg-gray-200 font-bold">
              <tr>
                <td colSpan="5" className="p-3 text-right">
                  Total Revenue:
                </td>
                <td className="p-3">₹{totalRevenue.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setShowOrderList(true)}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 flex items-center gap-2"
          >
            <ArrowRight size={18} /> Move to OrderList
          </button>

          <button
            onClick={() => setShowOrderList(true)}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <PlusCircle size={18} /> Add Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesList;