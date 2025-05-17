import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#FFFDF6] border-t border-gray-200 mt-16">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-[#015551]">
              RecruitAi
            </Link>
            <p className="text-gray-600">
              Revolutionizing recruitment with AI-powered solutions.
            </p>
          </div>

          {/* Center - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#015551]">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-700 hover:text-[#015551]">
                Home
              </Link>
              <Link to="/features" className="text-gray-700 hover:text-[#015551]">
                Features
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#015551]">
                Contact
              </Link>
            </div>
          </div>

          {/* Right - Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#015551]">Contact Us</h3>
            <div className="text-gray-700">
              <p>Email: info@recruitai.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          © {new Date().getFullYear()} RecruitAi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;