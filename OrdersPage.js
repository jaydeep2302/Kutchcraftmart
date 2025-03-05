import { useEffect, useState } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    const fetchOrders = async () => {
        const token = localStorage.getItem("sellerToken");
        console.log("Token:", token);
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: token },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    const token = localStorage.getItem("sellerToken");
    console.log("Token:", token);
    try {
      await axios.patch(
        `http://localhost:5000/api/orders/${orderId}`,
        { status },
        { headers: { Authorization: token } }
      );
      setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">📦 Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="border p-3">Order ID</th>
              <th className="border p-3">Products</th>
              <th className="border p-3">Total Price</th>
              <th className="border p-3">Address</th>
              <th className="border p-3">Payment</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3 text-gray-700">{order._id}</td>

                {/* Products List */}
                <td className="p-3">
                  <ul className="list-disc pl-4 text-gray-700">
                    {order.products.map((product, index) => (
                      <li key={index}>
                        <span className="font-semibold">{product.name}</span> (x{product.quantity})  
                        - <span className="text-blue-600 font-bold">₹{product.price}</span>
                      </li>
                    ))}
                  </ul>
                </td>

                <td className="p-3 text-gray-700 font-bold">₹{order.totalPrice}</td>

                {/* Address */}
                <td className="p-3 text-gray-600">
                  <p className="font-semibold">{order.address.name} - {order.address.phone}</p>
                  <p>{order.address.street}, {order.address.city}</p>
                  <p>{order.address.state} - {order.address.pincode}</p>
                </td>

                <td className="p-3 text-gray-700">{order.paymentMethod}</td>
                
                {/* Status */}
                <td className={`p-3 font-bold 
                  ${order.status === "Pending" ? "text-yellow-600" : 
                  order.status === "Shipped" ? "text-blue-600" : "text-green-600"}`}>
                  {order.status}
                </td>

                {/* Actions */}
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="p-2 border rounded bg-white text-gray-700 cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
