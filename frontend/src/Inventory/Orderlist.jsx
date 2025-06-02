import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [fishList, setFishList] = useState([]); // Add fish list state
  const [deliveryDate, setDeliveryDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [orderItems, setOrderItems] = useState([{ fish_id: '', quantity: '' }]);
  const [customerName, setCustomerName] = useState('');
  const navigate = useNavigate();

  // Fetch orders and fish list on mount
  useEffect(() => {
    fetch('http://127.0.0.1:8000/inventory/orders/')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));

    fetch('http://127.0.0.1:8000/inventory/fishstock/') // fetch fish options
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
  const handleOrderStatusChange = (orderId, newStatus) => {
    // Send PATCH request to update order status
    fetch(`http://127.0.0.1:8000/inventory/orders/${orderId}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update status');
        return res.json();
      })
      .then(updatedOrder => {
        // Update local state
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch(err => {
        console.error('Error updating status:', err);
        alert('Failed to update order status.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!deliveryDate) {
      alert("Please select a delivery date");
      return;
    }
    if (!customerName.trim()) {
      alert("Please enter customer name");
      return;
    }

    for (let item of orderItems) {
      if (!item.fish_id || !item.quantity || item.quantity <= 0) {
        alert("Please select fish and quantity for all items");
        return;
      }
      const fish = fishList.find(f => f.id === parseInt(item.fish_id));
      if (fish && parseInt(item.quantity) > fish.quantity) {
        alert(`Not enough stock for ${fish.name}`);
        return;
      }
    }


    const payload = {
      deliveryDate,
      status: status || 'pending',
      customer_name: customerName,
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
        // // Update stock quantities for each fish involved in the order
        // orderItems.forEach(item => {
        //   const fishId = parseInt(item.fish_id);
        //   const fish = fishList.find(f => f.id === fishId);
        //   if (fish) {
        //     const newStock = fish.quantity - parseInt(item.quantity);
        //     // Send PATCH request to update stock
        //     fetch(`http://127.0.0.1:8000/inventory/fishstock/${fishId}/`, {
        //       method: 'PATCH',
        //       headers: { 'Content-Type': 'application/json' },
        //       body: JSON.stringify({ quantity: newStock }),
        //     }).then(res => {
        //       if (!res.ok) {
        //         console.error(`Failed to update stock for fish ID ${fishId}`);
        //       } else {
        //         // Update local fishList state
        //         setFishList(prevFish =>
        //           prevFish.map(f =>
        //             f.id === fishId ? { ...f, quantity: newStock } : f
        //           )
        //         );
        //       }
        //     });
        //   }
        // });
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
    fetch(`http://127.0.0.1:8000/inventory/orders/${orderId}/convert-to-sale/`, {
      method: 'POST',
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => { throw new Error(e.error || 'Failed to convert'); });
        }
        return res.json();
      })
      .then(data => {
        console.log('Orders before removal:', orders);
        alert(`Order converted to sale successfully! Sale ID: ${data.id}`);
        // Remove the order from the list so it no longer appears in the order list
        setOrders(prev => {
          const newOrders = prev.filter(order => order.id !== orderId);
          console.log('Updated orders:', newOrders);
          return newOrders;
        });
        navigate('/saleslist');
      })
      .catch(error => {
        alert(`Error: ${error.message}`);
      });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-200 pt-4 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 Order List</h2>

        {/* Add Order Form */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date & Status */}
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
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-semibold">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                required
                className="p-3 border rounded"
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
                <option value="completed">Cancelled</option>
              </select>
            </div>

            {/* Items */}
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

            {/* Submit Button */}
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
                <th className="p-3">Customer Name</th>
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
                      <td className="p-3">{order.customer_name}</td>
                      <td className="p-3">{item.fishName || 'Unknown'}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">{formatDate(order.orderDate)}</td>
                      <td className="p-3">{formatDate(order.deliveryDate)}</td>
                      {/* Status Dropdown */}
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                          className="p-2 border rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      {/* Actions: Move to Sale button only if status is "completed" */}
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
                  <td colSpan="7" className="p-3 text-center">No orders found</td>
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