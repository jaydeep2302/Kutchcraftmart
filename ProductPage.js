import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";

const categories = ["All", "Men", "Women", "Children", "Home Decor"];

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOrder, setSortOrder] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // **Fetch Products from API**
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  let filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price Range</label>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
          <p className="text-gray-600">Up to ₹{priceRange[1]}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Sort By</label>
          <select
            className="w-full p-2 border rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">None</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </aside>
      
      <div className="flex-1">
      <nav className="md:hidden bg-teal-50 px-4 flex-wrapp justify-around items-center shadow-md">
          <select
            className="w-20 h-12 bg-teal-50 border left right"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
          <select
            className="w-40 h-12 bg-teal-50 border left right"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            className="w-40 h-12 bg-teal-50 border left right"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          >
            <option value="500">Up to ₹500</option>
            <option value="1000">Up to ₹1000</option>
            <option value="2000">Up to ₹2000</option>
            <option value="5000">Up to ₹5000</option>
          </select>
        </nav>
        
        <main className="p-6 bg-teal-50">
          <h2 className="text-2xl font-bold mb-4">Products</h2>

          {products.length === 0 ? (
            <p className="text-gray-500">Loading products...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {displayedProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 relative"
                >
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-36 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">₹{product.price}</p>
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button  className="text-red-500  hover:text-red-700">
                      <AiFillHeart size={20} />
                    </button>
                    <button onClick={() => addToCart(product)} className="text-gray-700 hover:text-black bg-white">
                      <AiOutlineShoppingCart size={20} />
                    </button>
                  </div>
                  <button 
  onClick={() => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "/product/";  // Page open karega
  }} 
  className="bg-blue-500 text-white px-4 py-2 rounded"
>View Details
                    </button>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
