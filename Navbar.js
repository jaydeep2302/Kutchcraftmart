import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignInAlt, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from localStorage if logged in
    const role = localStorage.getItem("role");
    const contact = localStorage.getItem("contact");

    if (role && contact) {
      setUser({ role, contact });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("contact");
    setUser(null);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="bg-teal-200 text-black p-4  flex justify-between items-center fixed w-full z-10 shadow-md">
      
      {/* Mobile: Menu Button (Left) */}
      <button onClick={() => setIsOpen(true)} className="md:hidden text-black focus:outline-none">
        <FaBars size={24} />
      </button>

      {/* Center - Logo */}
      <div className="text-2xl font-bold">KutchCraftMart</div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-gray-500">Home</Link>
        <Link to="/men" className="hover:text-gray-500">Men</Link>
        <Link to="/women" className="hover:text-gray-500">Women</Link>
        <Link to="/children" className="hover:text-gray-500">Children</Link>
        <Link to="/footwear" className="hover:text-gray-500">Footwear</Link>
        <Link to="/homedecor" className="hover:text-gray-500">Home Decor</Link>
        <Link to="/seller" className="hover:text-gray-500 font-bold">Seller</Link>
      </div>

      {/* Desktop: Right Side - Cart, Profile, and Login */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Cart Icon */}
        <Link to="/cart">
          <FaShoppingCart size={20} className="hover:text-gray-500 cursor-pointer" />
        </Link>

        {/* Profile Icon - Always Visible if Logged In */}
        {user && (
          <Link to={user.role === "seller" ? "/sellerpage" : "/user-profile"}>
            <FaUser size={22} className="hover:text-gray-500 cursor-pointer" />
          </Link>
        )}

        {/* Login Icon - Only When NOT Logged In */}
        {!user && (
          <button onClick={() => navigate("/login")}>
            <FaSignInAlt size={22} className="hover:text-gray-500 cursor-pointer" />
          </button>
        )}

        {/* Logout Button (Desktop) */}
        {user && (
          <button onClick={handleLogout}>
            <FaSignOutAlt size={22} className="hover:text-gray-500 cursor-pointer" />
          </button>
        )}
      </div>

      {/* Mobile: Only Show Login Icon (Remove When Logged In) */}
      <div className="md:hidden flex items-center space-x-4">
        {!user && (
          <button onClick={() => navigate("/login")}>
            <FaSignInAlt size={22} className="hover:text-gray-500 cursor-pointer" />
          </button>
        )}
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-20`}>
        
        {/* Sidebar Header with Profile (No Icon, Just Details) */}
        <div className="flex flex-col items-center justify-center py-6 bg-orange-100 shadow-md">
          <FaUser size={40} className="text-gray-700 mb-2" />
          {user ? (
            <>
              <p className="text-lg font-semibold">{user.contact}</p>
              <Link to={user.role === "seller" ? "/sellerpage" : "/user-profile"} className="text-blue-600">View Profile</Link>
              {/* Logout Button in Sidebar */}
              <button onClick={handleLogout} className="text-red-600 mt-2 flex items-center">
                <FaSignOutAlt size={18} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-lg font-semibold hover:text-gray-500" onClick={() => setIsOpen(false)}>
              Login / Register
            </Link>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-black">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-6 text-lg p-6">
          <Link to="/" className="hover:text-gray-500" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/men" className="hover:text-gray-500" onClick={() => setIsOpen(false)}>Men</Link>
          <Link to="/women" className="hover:text-gray-500" onClick={() => setIsOpen(false)}>Women</Link>
          <Link to="/children" className="hover:text-gray-500" onClick={() => setIsOpen(false)}>Children</Link>
          <Link to="/footwear" className="hover:text-gray-500" onClick={() => setIsOpen(false)}>Footwear</Link>
          <Link to="/homedecor" className="hover:text-gray-500" onClick={() => setIsOpen(false)}>Home Decor</Link>
          <Link to="/seller" className="hover:text-gray-500 font-bold" onClick={() => setIsOpen(false)}>Seller</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
