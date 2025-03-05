import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const textVariants = {
  initial: { opacity: 0, x: -50 },
  animate: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
  exit: (i) => ({
    opacity: 0,
    x: 50,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

// Default slides (if no custom data is provided)
const defaultSlides = [
  {
    heading: "Welcome to Kutch Craftmart !",
    paragraph:
      "A web application to represent the beauty of Kutch handicrafts globally. We are selling the beauty of Kutch handicrafts. It’s not just a product, it’s an emotion.",
  },
  {
    heading: "Authentic Handicrafts from Kutch",
    paragraph:
      "Experience the rich tradition of Kutch with our handcrafted products. Each piece is made by skilled artisans, preserving the heritage of India. The love of Kutch for handicrafts.",
  },
  {
    heading: "Handmade with Love & Culture",
    paragraph:
      "Our handmade crafts represent the soul of Kutch. Using traditional techniques passed down for generations, we bring you unique and authentic products.",
  },
];

const TextSlider = ({ slides = defaultSlides, type = "text" }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-b from-teal-100 to-teal-50 flex items-center justify-center p-6">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={500}
        modules={[ Autoplay]}
        className="w-full text-center text-white"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  {/* Conditional rendering for text or images */}
                  {type === "text" ? (
                    <>
                      <motion.h2
                        className="text-2xl sm:text-3xl font-bold text-black mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {slide.heading}
                      </motion.h2>

                      <motion.p className="text-base sm:text-lg text-black px-4 max-w-2xl leading-relaxed">
                        {slide.paragraph.split(" ").map((word, i) => (
                          <motion.span
                            key={i}
                            custom={i}
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="inline-block mx-1"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </motion.p>
                    </>
                  ) : (
                    <motion.img
                      src={slide.image}
                      alt="Slide"
                      className="w-full max-w-md h-64 object-cover rounded-md shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TextSlider;
