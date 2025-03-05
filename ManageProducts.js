import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [password, setPassword] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    const token = localStorage.getItem("sellerToken");
    try {
      const res = await axios.get("http://localhost:5000/api/product/display", {
        headers: 
        { Authorization: token },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle edit product
  const handleEditProduct = async () => {
    const token = localStorage.getItem("sellerToken");
    try {
      await axios.put(
        `http://localhost:5000/api/product/update/${editingProduct._id}`,
        editingProduct,
        {
          headers: { Authorization: token },
        }
      );
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle delete products
  const handleDelete = async () => {
    const token = localStorage.getItem("sellerToken");
    try {
      await axios.post(
        "http://localhost:5000/api/product/delete",
        { productIDs: selectedProducts, password },
        { headers: { Authorization: token } }
      );
      setSelectedProducts([]);
      setPassword("");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  // Select/unselect products for deletion
  const toggleProductSelection = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Products</h2>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-2 border">Select</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">description</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => toggleProductSelection(product._id)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="p-2">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2">${product.price}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">{product.type}</td>
                <td className="p-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>

            <input
              type="text"
              placeholder="Name"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="description"
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, description: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Type"
              value={editingProduct.type}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, type: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
            />

            <div className="flex justify-between">
              <button
                onClick={handleEditProduct}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Products Section */}
      {selectedProducts.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Delete Selected Products</h3>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
