
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import register from "../assets/registeration.webp";
import manageproduct from "../assets/manageproduct.webp";
import sellerdashboard from "../assets/sellerdashboard.webp";
import listing from "../assets/listing.webp";
import profile from "../assets/profile.webp"


const slides = [
  {
    img: register,
    title: "Easy registeration ",
    description:"Sign up with your GST details, address, and bank information to start selling.",
  },
  {
    img: manageproduct,
    title: "Manage products",
    description: "Upload your Kutchi handicrafts and reach a larger audience with ease.",
  },
  {
    img: sellerdashboard,
    title: "Seller Dashboard",
    description: "Stay updated with customer orders and ensure a smooth selling experience.",
  },
  {
    img: listing,
    title: "Easy listing",
    description: "We take care of shipping, so you can focus on your business growth.",
  },
  {
    img: profile,
    title: "Profile Management ",
    description: "Receive payments directly into your bank within 7 days of order dispatch.",
  },
];

export default function SellerSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 4000); // Auto-slide every 4 seconds
      return () => clearInterval(interval);
    }, []);
  
    return (
    <div className="bg-teal-100">
      <div className="relative w-full min-h-[600px] md:min-h-[400px] max-w-5xl mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex flex-col md:flex-row items-center justify-between p-8 space-x-0 md:space-x-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            {/* Text Section */}
            <div className="md:w-1/2 px-20 text-center md:text-left flex-col md:flex-row">
              <h2 className="text-3xl font-bold text-teal-700">{slides[currentIndex].title}</h2>
              <p className="text-gray-700 text-lg mt-4">{slides[currentIndex].description}</p>
            </div>
  
            {/* Image Section */}
            <motion.img
              src={slides[currentIndex].img}
              alt={slides[currentIndex].title}
              className="w-3/4 md:w-1/2 max-w-xs md:max-w-sm mt-6 md:mt-0 object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </AnimatePresence>
  
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            className="bg-teal-600 text-white p-2 rounded-full shadow-md hover:bg-teal-700"
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))}
          >
            ❮
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            className="bg-teal-600 text-white p-2 rounded-full shadow-md hover:bg-teal-700"
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)}
          >
            ❯
          </button>
        </div>
      </div>
      </div>
    );
}

