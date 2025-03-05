import React from "react";

const products = [
  {
    id: 1,
    name: "Kutchi Bandhani Saree",
    price: "₹2,500",
    image: "https://example.com/bandhani.jpg",
    link: "/product/bandhani-saree",
  },
  {
    id: 2,
    name: "Handmade Leather Wallet",
    price: "₹1,200",
    image: "https://example.com/leather-wallet.jpg",
    link: "/product/leather-wallet",
  },
  {
    id: 3,
    name: "Ajrakh Print Dupatta",
    price: "₹1,800",
    image: "https://example.com/ajrakh-dupatta.jpg",
    link: "/product/ajrakh-dupatta",
  },
  {
    id: 4,
    name: "Lacquered Wooden Box",
    price: "₹900",
    image: "https://example.com/lacquer-box.jpg",
    link: "/product/lacquer-box",
  },
];

const Gallery = () => {
  return (
    <div className="min-h-[60vh]  bg-teal-50 py-5 px-8">
      {/* Decreased top padding */}
      <h1 className="text-3xl font-bold text-center  text-black mb-4">Handicraft Gallery</h1>
      {/* Updated grid settings for mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2 sm:px-4">
        {/* Decreased gap and padding */}
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-2 sm:p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            {/* Decreased height slightly */}
            <h2 className="text-sm sm:text-lg font-semibold text-gray-700 mt-2 sm:mt-3">
              {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-bold">{product.price}</p>
            <a
              href={product.link}
              className="mt-2 sm:mt-3 inline-block bg-teal-300 text-black px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-teal-400 text-xs sm:text-sm"
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
