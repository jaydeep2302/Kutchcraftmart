import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

import OrdersPage from '../components/OrdersPage';
import SellerProfile from './../pages/SellerProfile';
import AddProduct from "./../components/AddProduct";
import ManageProducts from '../components/ManageProducts';
import SellerInventory from './../components/Inventory';

const SellerPage = () => {
  const [activeComponent, setActiveComponent] = useState('profile');

  const renderContent = () => {
    switch (activeComponent) {
      case 'orders':
        return <OrdersPage />;
      case 'addproduct':
        return <AddProduct />;
      case 'products':
        return <ManageProducts />;
      case 'inventory':
        return <SellerInventory />;
      case 'profile':
          return <SellerProfile />;
      default:
        return <SellerProfile/>;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
      <div className="ml-64 p-8 w-full">{renderContent()}</div>
    </div>
  );
};

export default SellerPage;
