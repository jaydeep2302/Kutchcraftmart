import React from 'react';

const Sidebar = ({ setActiveComponent, activeComponent }) => {
  return (
    <div className="bg-teal-200 text-black h-screen md:w-64 w-48 p-5 fixed">
      <h2 className="text-left text-2xl md:text-3xl font-bold mb-6 md:mb-8">Hello, Seller!</h2>
      <ul className="space-y-3 md:space-y-4">
        <li>
          <button
            onClick={() => setActiveComponent('dashboard')}
            className={`w-full text-left py-2 px-3 md:px-4 rounded transition-colors duration-200 ${
              activeComponent === 'dashboard' ? 'bg-teal-300' :  'hover:bg-teal-400'
            }`}
          >
            📊 Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('orders')}
            className={`w-full text-left py-2 px-3 md:px-4 rounded transition-colors duration-200 ${
              activeComponent === 'orders' ? 'bg-teal-300' :  'hover:bg-teal-400'
            }`}
          >
            🛒 Orders
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('addproduct')}
            className={`w-full text-left py-2 px-3 md:px-4 rounded transition-colors duration-200 ${
              activeComponent === 'addproduct' ? 'bg-teal-300' :  'hover:bg-teal-400'
            }`}
          >
            ➕ Add Product
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('products')}
            className={`w-full text-left py-2 px-3 md:px-4 rounded transition-colors duration-200 ${
              activeComponent === 'products' ? 'bg-teal-300' :  'hover:bg-teal-400'
            }`}
          >
            📦 Products
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('inventory')}
            className={`w-full text-left py-2 px-3 md:px-4 rounded transition-colors duration-200 ${
              activeComponent === 'inventory' ? 'bg-teal-300' :  'hover:bg-teal-400'
            }`}
          >
            📋 Inventory
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('profile')}
            className={`w-full text-left py-2 px-3 md:px-4 rounded transition-colors duration-200 ${
              activeComponent === 'profile' ? 'bg-teal-300' :  'hover:bg-teal-400'
            }`}
          >
            👤 Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('logout')}
            className={`w-full text-left py-2 px-3 md:px-4 rounded transition-colors duration-200 ${
              activeComponent === 'logout' ? 'bg-teal-300' :  'hover:bg-teal-400'
            }`}
          >
            💼 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
