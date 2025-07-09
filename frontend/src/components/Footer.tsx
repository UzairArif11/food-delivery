import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">About Us</h4>
            <p className="text-gray-300">
              We are a leading food delivery service, committed to bringing you
              the best dishes from top restaurants right to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-white">Menu</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <p className="text-gray-300">Email: support@fooddelivery.com</p>
            <p className="text-gray-300">Phone: +1 234 567 890</p>
            <div className="flex space-x-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/images/Facebook.png" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/images/Instagram.png" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/images/TikTok.png" alt="TikTok" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">
          © 2025 FoodDelivery. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
