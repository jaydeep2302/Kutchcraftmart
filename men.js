import React  from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/footer";
import Gallery from "../../component/Gallery.js";
import Slider from "../../component/Slider.js";
import ProductPage from "../../component/ProductPage.js";

const Men = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <Slider />
      
      <Gallery />
      <ProductPage category={Men} />

      <Footer />
    </div>
  );
};

export default Men;
