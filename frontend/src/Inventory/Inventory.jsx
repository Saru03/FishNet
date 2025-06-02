import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FishList from './fishlist';
import OrderList from './Orderlist';
import SalesList from './Saleslist';
import StockReport from './StockReport';
import OrderReports from './OrderReports';
import SalesReport from './SalesReport';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('fishlist');
  const navigate = useNavigate();

  // 👮‍♂️ Login check logic here
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You're not logged in. Please log in to access Inventory.");
       setTimeout(() => {
      navigate("/login");
    }, 100); // 100ms delay is enough
  
    }
  }, [navigate]);

  const renderTab = () => {
    switch (activeTab) {
      case 'fishlist':
        return <FishList />;
      case 'orders':
        return <OrderList />;
      case 'sales':
        return <SalesList />;
      case 'stockreport':
        return <StockReport />;
      case 'orderreports':
        return <OrderReports />;
      case 'salesreport':
        return <SalesReport />;
      default:
        return <FishList />;
    }
  };

  const getTabLabel = (tab) => {
    switch (tab) {
      case 'fishlist': return '🐟 Fish Stock';
      case 'orders': return '📋 Orders';
      case 'sales': return '💰 Sales';
      case 'stockreport': return '📊 Stock Report';
      case 'orderreports': return '📈 Order Reports';
      case 'salesreport': return '📊 Sales Report';
      default: return tab;
    }
  };

  const getTabDescription = (tab) => {
    switch (tab) {
      case 'fishlist': return 'Manage fish inventory and stock levels';
      case 'orders': return 'Track and manage customer orders';
      case 'sales': return 'View completed sales and transactions';
      case 'stockreport': return 'Analyze fish stock levels and trends';
      case 'orderreports': return 'Detailed order analytics and insights';
      case 'salesreport': return 'Comprehensive sales performance analytics';
      default: return '';
    }
  };

  const fullWidthComponents = ['stockreport', 'orderreports', 'salesreport'];
  const isFullWidth = fullWidthComponents.includes(activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-7xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 drop-shadow-md">
            🎣 Fish Inventory Management
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete solution for managing your fish business operations
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-2 lg:gap-4 mb-8 flex-wrap">
          {['fishlist', 'orders', 'sales', 'stockreport', 'orderreports', 'salesreport'].map((tab) => (
            <div key={tab} className="group relative">
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-3 lg:px-4 py-2 lg:py-3 rounded-full font-semibold text-xs lg:text-sm transition-all duration-300
                  ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-400/50 scale-105'
                      : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-100 hover:scale-105'
                  }
                `}
              >
                {getTabLabel(tab)}
              </button>

              {/* Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                {getTabDescription(tab)}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Counter */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {activeTab === 'fishlist' && '🐟'}
            {activeTab === 'orders' && '📋'}
            {activeTab === 'sales' && '💰'}
            {activeTab === 'stockreport' && '📊'}
            {activeTab === 'orderreports' && '📈'}
            {activeTab === 'salesreport' && '📊'}
            <span className="ml-2">{getTabDescription(activeTab)}</span>
          </span>
        </div>

        {/* Content Area */}
        {isFullWidth ? (
          <div className="w-full">
            {renderTab()}
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-4 lg:p-8">
            {renderTab()}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Fish Inventory Management System © 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
