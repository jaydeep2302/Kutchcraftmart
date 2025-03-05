import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const GallerySlider = () => {

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/product/latest");
            const data = await response.json();
            setLatestProducts(data);
        } catch (error) {
            console.error("Error fetching latest products:", error);
        }
    };

    fetchLatestProducts();
}, []);

  return (
    <div className="bg-teal-50 py-10">
      <h1 className="text-3xl font-bold text-left text-black mb-6 px-10">
        New Arrival
      </h1>
      <div className="px-10 ">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.1}
          centeredSlides={true} // Ensures active slide is centered
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          navigation={true}
          breakpoints={{
            320: {
              slidesPerView: 1.2, // Show full slide and part of next/prev slides
              spaceBetween: 40,
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 100,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="w-full"
        >
          {latestProducts.map((product) => (
            <SwiperSlide key={product.id} className="">
              <div className="bg-white shadow-lg rounded-lg p-4 w-80 mx-auto md:w-full">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  
                  className="w-full h-52 object-cover rounded-md"
                />
                <h2 className="text-lg  font-semibold text-gray-700 mt-3">
                  {product.name}
                </h2>
                <p className="text-gray-600 font-bold">{product.price}</p>
                <button 
  onClick={() => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "/product/";  // Page open karega
  }} 
  className="bg-blue-500 text-white px-4 py-2 rounded"
>View Details
                    </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GallerySlider;
