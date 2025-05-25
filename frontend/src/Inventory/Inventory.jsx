import React, { useState } from 'react';
import Fishlist from './Fishlist';
import OrderList from './Orderlist';
import SalesList from './Saleslist';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('fishlist');

  const renderTab = () => {
    switch (activeTab) {
      case 'fishlist':
        return <Fishlist />;
      case 'orders':
        return <OrderList />;
      case 'sales':
        return <SalesList />;
      default:
        return <Fishlist />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-8 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900 drop-shadow-md">
        🎣 Inventory 
      </h2>

      <div className="flex justify-center gap-6 mb-10">
        {['fishlist', 'orders', 'sales'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300
              ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-400/50 scale-105'
                  : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-100 hover:scale-105'
              }
            `}
          >
            {tab === 'fishlist' && 'Fish Stock'}
            {tab === 'orders' && 'Orders'}
            {tab === 'sales' && 'Sales'}
          </button>
        ))}
      </div>

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-8">
        {renderTab()}
      </div>
    </div>
  );
};

export default Inventory;
