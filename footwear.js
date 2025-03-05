import React from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/footer";
import Gallery from "../../component/Gallery.js";
import Slider from "../../component/Slider.js";
import ProductPage from "../../component/ProductPage.js";
const Footwear = () => {
  return (
    <div className="min-h-screen bg-orange-200">
        <Navbar />
        <Slider />
        <Gallery />
        <ProductPage category={Footwear} />

        <Footer />
    </div>
  );
};

export default Footwear;
