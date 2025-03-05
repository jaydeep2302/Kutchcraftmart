import React, { useState } from "react";

const SearchBar = ({ products, setFilteredProducts }) => {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearch = () => {
    let filtered = [...products];

    // Name Search
    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Price Range Validation
    if (minPrice && maxPrice) {
      if (parseFloat(minPrice) > parseFloat(maxPrice)) {
        alert("Min price cannot be greater than max price!");
        return;
      }
      filtered = filtered.filter(
        (product) =>
          product.price >= parseFloat(minPrice) &&
          product.price <= parseFloat(maxPrice)
      );
    }

    // Category Filter
    if (category) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sorting
    if (sortOption === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "nameAsc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameDesc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg">
      {/* Name Input */}
      <input
        type="text"
        placeholder="Search by name"
        className="p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Min Price */}
      <input
        type="number"
        placeholder="Min Price"
        className="p-2 border rounded"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      {/* Max Price */}
      <input
        type="number"
        placeholder="Max Price"
        className="p-2 border rounded"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      {/* Category Dropdown */}
      <select
        className="p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="books">Books</option>
      </select>

      {/* Sorting Dropdown */}
      <select
        className="p-2 border rounded"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
        <option value="nameAsc">Name: A to Z</option>
        <option value="nameDesc">Name: Z to A</option>
      </select>

      {/* Search Button */}
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
