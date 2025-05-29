{/*import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    saleDate: '',
    fishSpecies: '',
    fishSize: 'small',
    marketName: '',
    quantity: '',
    pricePerFish: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = Number(formData.quantity) * Number(formData.pricePerFish);
    const newSale = {
      id: Date.now(),
      ...formData,
      totalPrice
    };
    setSales([...sales, newSale]);
    setFormData({
      saleDate: '',
      fishSpecies: '',
      fishSize: 'small',
      marketName: '',
      quantity: '',
      pricePerFish: ''
    });
  };

  const totalSales = sales.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalQuantity = sales.reduce((acc, curr) => acc + parseInt(curr.quantity), 0);
  const avgPrice = totalQuantity ? totalSales / totalQuantity : 0;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-200 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 Sales Records</h2>

        {/* Analytical Stats 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-100 p-6 rounded-xl shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-green-700">Total Sales</h3>
              <p className="text-2xl font-semibold text-gray-800">₹{totalSales.toFixed(2)}</p>
            </div>
            <div className="text-green-600 text-4xl">💰</div>
          </div>

          <div className="bg-blue-100 p-6 rounded-xl shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-blue-700">Total Quantity</h3>
              <p className="text-2xl font-semibold text-gray-800">{totalQuantity} kg</p>
            </div>
            <div className="text-blue-600 text-4xl">🐟</div>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-yellow-700">Avg. Price per Fish</h3>
              <p className="text-2xl font-semibold text-gray-800">₹{avgPrice.toFixed(2)}</p>
            </div>
            <div className="text-yellow-600 text-4xl">💵</div>
          </div>
        </div>

        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white shadow p-6 rounded-xl mb-8">
          <input type="date" name="saleDate" value={formData.saleDate} onChange={handleChange} required className="p-3 border rounded" />
          <input type="text" name="fishSpecies" value={formData.fishSpecies} onChange={handleChange} placeholder="Fish Species" required className="p-3 border rounded" />
          <select name="fishSize" value={formData.fishSize} onChange={handleChange} className="p-3 border rounded">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <input type="text" name="marketName" value={formData.marketName} onChange={handleChange} placeholder="Fish Market Name" required className="p-3 border rounded" />
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required className="p-3 border rounded" />
          <input type="number" name="pricePerFish" value={formData.pricePerFish} onChange={handleChange} placeholder="Price per Fish (₹)" required className="p-3 border rounded" />
          <button type="submit" className="col-span-1 md:col-span-3 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2">
            <PlusCircle size={20} /> Add Sale
          </button>
        </form>

        
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Fish</th>
                <th className="p-3">Size</th>
                <th className="p-3">Market</th>
                <th className="p-3">Qty</th>
                <th className="p-3">₹/Fish</th>
                <th className="p-3">Total ₹</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{sale.saleDate}</td>
                  <td className="p-3">{sale.fishSpecies}</td>
                  <td className="p-3 capitalize">{sale.fishSize}</td>
                  <td className="p-3">{sale.marketName}</td>
                  <td className="p-3">{sale.quantity}</td>
                  <td className="p-3">₹{sale.pricePerFish}</td>
                  <td className="p-3">₹{sale.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesList;*/}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowRight } from 'lucide-react';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    saleDate: '',
    fishSpecies: '',
    fishSize: 'small',
    marketName: '',
    quantity: '',
    pricePerFish: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/inventory/sales/')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(err => console.error('Failed to fetch sales:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      sale_date: formData.saleDate,
      items: [
        {
          fish: formData.fishSpecies,
          fish_size: formData.fishSize,
          quantity: parseInt(formData.quantity),
          price_per_unit: parseFloat(formData.pricePerFish)
        }
      ],
      market_name: formData.marketName
    };

    fetch('http://127.0.0.1:8000/inventory/sales/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(newSale => {
      setSales([...sales, newSale]);
      setFormData({
        saleDate: '',
        fishSpecies: '',
        fishSize: 'small',
        marketName: '',
        quantity: '',
        pricePerFish: ''
      });
    })
    .catch(err => console.error('Failed to add sale:', err));
  };

  const getSaleTotal = (sale) =>
    sale.items.reduce((sum, item) => sum + item.quantity * item.price_per_unit, 0);

  const totalRevenue = sales.reduce((acc, sale) => acc + getSaleTotal(sale), 0);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-200 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 Sales Records</h2>

        {/* Sale Entry Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white shadow p-6 rounded-xl mb-8">
          <input
            type="date"
            name="saleDate"
            value={formData.saleDate}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="fishSpecies"
            value={formData.fishSpecies}
            onChange={handleChange}
            placeholder="Fish Species"
            required
            className="p-3 border rounded"
          />
          <select
            name="fishSize"
            value={formData.fishSize}
            onChange={handleChange}
            className="p-3 border rounded"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <input
            type="text"
            name="marketName"
            value={formData.marketName}
            onChange={handleChange}
            placeholder="Fish Market Name"
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
            type="submit"
            className="col-span-1 md:col-span-3 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} /> Add Sale
          </button>
        </form>

        {/* Sales Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Fish</th>
                <th className="p-3">Size</th>
                <th className="p-3">Market</th>
                <th className="p-3">Qty</th>
                <th className="p-3">₹/Fish</th>
                <th className="p-3">Total ₹</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) =>
                sale.items.map((item, index) => (
                  <tr key={`${sale.id}-${index}`} className="border-t hover:bg-gray-50">
                    {index === 0 && (
                      <td className="p-3" rowSpan={sale.items.length}>
                        {sale.sale_date}
                      </td>
                    )}
                    <td className="p-3">{item.fish}</td>
                    <td className="p-3 capitalize">{item.fish_size || formData.fishSize}</td>
                    <td className="p-3">{sale.market_name || formData.marketName}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">₹{item.price_per_unit}</td>
                    <td className="p-3">₹{item.quantity * item.price_per_unit}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="bg-gray-200 font-bold">
              <tr>
                <td colSpan={6} className="p-3 text-right">
                  Total Revenue:
                </td>
                <td className="p-3">₹{totalRevenue}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/inventory')}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 flex items-center gap-2"
          >
            <ArrowRight size={18} /> Back to Inventory
          </button>

          <button
            onClick={() => navigate('/orderlist')}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 flex items-center gap-2"
          >
            <ArrowRight size={18} /> Go to Order List
          </button>

          {/* Added Add Order button */}
          <button
            onClick={() => navigate('/orderlist')}
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

