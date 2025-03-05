import { useEffect, useState } from "react";

export default function OrderPage() {
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (storedProduct) setProduct(storedProduct);
  }, []);

  const placeOrder = async () => {
    const token = localStorage.getItem("token"); // User JWT Token

    if (!token) {
      alert("User not logged in!");
      return;
    }

    const response = await fetch("http://localhost:5001/order/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Token bhej rahe hain
      },
      body: JSON.stringify({
        sellerID: product.sellerID,
        products: [{ productID: product._id, name: product.name, quantity: 1, price: product.price }],
        address,
        paymentMethod: "COD"
      })
    });

    const data = await response.json();
    alert(data.message);
  };

  if (!product) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Shipping Address</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <input type="text" placeholder="Name" onChange={(e) => setAddress({ ...address, name: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Phone" onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Street" onChange={(e) => setAddress({ ...address, street: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="City" onChange={(e) => setAddress({ ...address, city: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="State" onChange={(e) => setAddress({ ...address, state: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Pincode" onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="border p-2 rounded" />
      </div>

      <h2 className="text-2xl font-bold mt-6">Order Summary</h2>
      <div className="border p-4 mt-2 rounded">
        <p className="text-lg">{product.name}</p>
        <p className="text-gray-600">₹{product.price}</p>
      </div>

      <button
        onClick={placeOrder}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Place Order (COD)
      </button>
    </div>
  );
}
