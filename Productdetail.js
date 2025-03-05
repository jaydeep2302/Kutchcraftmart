import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (storedProduct) {
      setProduct(storedProduct);
      setReviews(storedProduct.reviews || []);
    }
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };


  const handleReviewSubmit = () => {
    if (review.trim() === "") return;

    const newReviews = [...reviews, review];
    setReviews(newReviews);
    setReview("");

    // Optionally, store the reviews in localStorage
    localStorage.setItem(
      "selectedProduct",
      JSON.stringify({ ...product, reviews: newReviews })
    );
  };

  if (!product)
    return <p className="text-center text-red-500">No Product Selected</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div>
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="gap-1">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">
            Category: {product.category}
          </p>
          <p className="text-2xl font-semibold text-green-600 mt-2">
            ₹{product.price}
          </p>
          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Stock Status */}
          <p
            className={`mt-2 text-lg font-semibold ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </p>

          {/* Buttons */}
          <div className="mt-4 flex space-x-4">
            <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/order")}
              className={`px-6 py-2 rounded-lg ${
                product.stock > 0
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
        <div className="mt-4">
          {reviews.length > 0 ? (
            reviews.map((rev, index) => (
              <p key={index} className="bg-gray-100 p-2 rounded mt-2 text-gray-700">
                {rev}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>

        {/* Add Review */}
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Write a review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            onClick={handleReviewSubmit}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
