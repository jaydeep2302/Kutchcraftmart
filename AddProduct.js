import { useState } from "react";
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    type: "online",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    // Image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("sellerToken");

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    formData.append("type", product.type);
    formData.append("image", product.image);

    try {
      const response = await fetch("http://localhost:5000/api/product/add", {
        method: "POST",
        headers: {
          Authorization: token, // Ensure the token is correctly retrieved
        },    
        body: formData, // Removed JSON.stringify
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (data.success) {
        alert("Product added successfully!");
        setProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          type: "online",
          image: null,
        });
        setPreview(null);
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl flex-center  mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          rows="3"
          required
        ></textarea>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>

        {/* Category */}
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />

        {/* Product Type: Online / Offline */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value="online"
              checked={product.type === "online"}
              onChange={handleChange}
              className="form-radio text-teal-400"
            />
            <span>Online</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value="offline"
              checked={product.type === "offline"}
              onChange={handleChange}
              className="form-radio text-teal-400"
            />
            <span>Offline</span>
          </label>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col items-center">
          <input type="file" onChange={handleImageChange} className="mb-2" />
          {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-teal-300 hover:bg-teal-400 text-white rounded-md font-semibold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
