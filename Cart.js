import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);

    // 🔹 Logout hone par cart clear karne ke liye event listener
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(updatedCart);
      calculateTotal(updatedCart);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => {
      const itemPrice = Number(item.price) || 0;
      const itemQuantity = item.quantity || 1;
      return sum + itemPrice * itemQuantity;
    }, 0);
    setTotalAmount(total);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const updateQuantity = (id, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: action === "increase" ? (item.quantity || 1) + 1 : Math.max(1, (item.quantity || 1) - 1),
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, "decrease")}
                    className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity || 1}</span>
                  <button
                    onClick={() => updateQuantity(item.id, "increase")}
                    className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                  >
                    +
                  </button>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/product/${item.id}`}
                    className="w-full text-center bg-teal-500 hover:bg-teal-600 text-white py-2 rounded"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Amount & Buy Now Button */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <h3 className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
