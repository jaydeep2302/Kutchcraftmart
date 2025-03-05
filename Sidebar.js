import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-4">Seller Dashboard</h2>
      <ul className="space-y-3">
        <li><Link to="/seller-profile" className="hover:text-blue-300">Profile</Link></li>
        <li><Link to="/addproduct" className="hover:text-blue-300">Add Product</Link></li>
        <li><Link to="/products" className="hover:text-blue-300">Manage Products</Link></li>
        <li><Link to="/orders" className="hover:text-blue-300">Orders</Link></li>
        <li><Link to="/dashboard/inventory" className="hover:text-blue-300">Inventory</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;