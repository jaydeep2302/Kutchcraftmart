import { Link } from "react-router-dom";
import React from "react"
import SellerSlider from "../components/Feslider";
import registerImg from "../assets/register.jpg";
import listImg from "../assets/list.jpg";
import orderImg from "../assets/order.jpg";
import shipmentImg from "../assets/shipment.jpg";
import paymentImg from "../assets/payment.jpg";
import f1 from "../assets/f1.jpg";

const sellerJourney = [
  { img: registerImg, title: "Register", description: "Sign up with GST, address & bank details." },
  { img: listImg, title: "List Products", description: "Showcase your unique Kutchi handicrafts." },
  { img: orderImg, title: "Manage Orders", description: "Handle customer orders efficiently." },
  { img: shipmentImg, title: "Shipment", description: "We ensure hassle-free delivery of your products." },
  { img: paymentImg, title: "Payment", description: "Get paid securely within 7 days of dispatch." },
];



export default function SellerLandingPage() {

  return (
    <div className="w-full min-h-screen bg-teal-50  flex-col items-center justify-center overflow-hidden absolute top-0 left-0 w-full">
      {/* Navigation Bar */}
      <nav className="w-full p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-600">KutchCraftMart</h1>
        <Link to={"/seller-login"}><button className="bg-teal-600 text-white px-4 py-2 rounded">Login</button></Link>
      </nav>
      {/* Hero Section */}
      <div className="flex flex-1 flex-col w-full h-[60vh] bg-teal-100 md:flex-row items-center justify-center text-left md:text-left">
        <div className="md:w-1/2 px-20 space-y-6">
          <h2 className="text-4xl font-bold text-teal-700">Expand Your Business with Us</h2>
          <p className="text-gray-700 text-lg">A perfect eCommerce website for selling your Kutchi handicrafts.</p>
          <Link to={"/seller-registration"} classlName="bg-teal-600 text-white px-6 py-3 rounded shadow-md hover:bg-teal-700">
            Get Started
          </Link>

        </div >
        <div className="w-full md:w-1/2 flex justify-center">
        <image src={f1} alt="example"  className="w-3/4"/>
        </div>
      </div>
      <SellerSlider />
      <div className="bg-teal-100 py-12 px-6 text-center">
          <h2 className="text-3xl font-bold text-teal-700 mb-8">Your Journey as a Seller</h2>    
          <div className="flex flex-col gap-5 items-center md:items-stretch md:grid md:grid-cols-2 lg:grid-cols-5">
        {sellerJourney.map((step, index) => (
          <div key={index} className="bg-teal-50 shadow-lg p-6 rounded-lg flex flex-col items-center text-center">
            <img src={step.img} alt={step.title} className="w-full h-80  object-contain" />
            <h3 className="text-xl font-bold mt-4">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
      </div>
      {/* Footer */}
      <footer className="bg-teal-700 text-white p-4 text-center">
        &copy; 2025 KutchCraftMart. All rights reserved.
      </footer>
    </div>
  );
}
