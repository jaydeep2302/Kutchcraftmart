import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Import Images from src/assets
import ajrakh from "../assets/ajrakh.jpg";
import rogan from "../assets/rogan.jpg";
import lippan from "../assets/lippan.jpg";
import bandhani from "../assets/bandhani.jpg";
import embroidery from "../assets/embroidery.jpg";

// Handicrafts Data
const handicrafts = [
  {
    name: "Ajrakh Printing",
    img: ajrakh,
    description: "A traditional block-printing technique using natural dyes, originating from Kutch.",
  },
  {
    name: "Rogan Art",
    img: rogan,
    description: "An ancient Persian art form using castor oil-based colors to create intricate designs.",
  },
  {
    name: "Lippan Art",
    img: lippan,
    description: "Decorative designs using mud and mirrors for stunning reflective patterns.",
  },
  {
    name: "Bandhani Tie-Dye",
    img: bandhani,
    description: "A famous tie-dye technique producing vibrant and intricate fabric designs.",
  },
  {
    name: "Kutchi Embroidery",
    img: embroidery,
    description: "Handcrafted embroidery with mirror work and bright colors, famous in Kutch.",
  },
];

const HandicraftGallery = () => {
  return (
    <div className="w-[90%] sm:w-[85%] md:w-full max-w-7xl mx-auto p-6 m- bg-gradient-to-b from-teal-200 to-teal-50 rounded-xl">
      {/* Mobile: 90% width, Tablet: 85%, Desktop: Full width (7xl) */}
      
      <h2 className="text-3xl font-bold text-center text-black mb-6">
        Handicrafts of Kutch
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
        speed={1200}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {handicrafts.map((craft, index) => (
          <SwiperSlide key={index} className="p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={craft.img}
                alt={craft.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{craft.name}</h3>
                <p className="text-gray-600 mt-2">{craft.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HandicraftGallery;
