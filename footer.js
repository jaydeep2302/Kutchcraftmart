import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-200 rounded-t-xl text-black py-8 mt-auto w-full p-4">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-6">
          <div>
            <h2 className="text-xl font-bold text-black">About Us</h2>
            <p className="mt-3 text-black">
              We bring you authentic handcrafted products from Kutch, made with
              love by skilled artisans.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black">Quick Links</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="/shop" className="text-black hover:text-orange-400">
                  Shop Now
                </a>
              </li>
              <li>
                <a href="/about" className="text-black hover:text-orange-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-black hover:text-orange-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-black hover:text-orange-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">Follow Us</h2>
            <div className="flex mt-3 space-x-4">
              <a href="lippan.jpg" className="text-black hover:text-blue-500">
                <FaFacebook size={24} />
              </a>
              <a href="rogan.jpg" className="text-black hover:text-pink-500">
                <FaInstagram size={24} />
              </a>
              <a href="slide1.jpg" className="text-black hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
              <a href="slide2.jpg" className="text-black hover:text-blue-700">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-6 text-black-500 text-sm">
          © {new Date().getFullYear()} Kutch craftmart | All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
