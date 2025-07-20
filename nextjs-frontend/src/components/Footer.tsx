'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2024);  // Default year to prevent hydration error

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">TasteBuds</h3>
            <p className="text-gray-300">
              Delicious food delivered to your doorstep. Experience the finest 
              culinary delights from our kitchen to your table.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                📘 Facebook
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                🐦 Twitter
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                📷 Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/menu" 
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Menu
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-primary">📞</span>
                <span className="text-gray-300">+92-42-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-primary">✉️</span>
                <span className="text-gray-300">info@fooddelivery.pk</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-primary mt-1">📍</span>
                <span className="text-gray-300">
                  H856+M3J, Mozang Chungi<br />
                  Lahore, Punjab 54000
                </span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Opening Hours</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>11:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} FoodDelivery. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
