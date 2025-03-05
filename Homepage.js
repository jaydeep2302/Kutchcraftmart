import React from "react";
import Navbar from "../../component/Navbar.js";
import Slider from "../../component/Slider.js";
import HandicraftGallery from "../../component/handslider.js";
import Gallery from "../../component/Gallery.js";
import Footer from "../../component/footer.js";
import ProductGallery from "./Product.js";
import KutchHandicrafts from "../../component/Journey.js";
const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Gallery />
      <ProductGallery />
      <HandicraftGallery />
      <KutchHandicrafts />
      <Footer />
    </div>
  );
};

export default Homepage;
