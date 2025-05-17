import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FFFDF6] border-b border-gray-200">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#015551]">
              RecruitAi
            </Link>
          </div>

          {/* Center - Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
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

          {/* Right - Button and Mobile Menu Icon */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link
                to="/post"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#015551] hover:bg-[#01403d]"
              >
                New post
              </Link>
            </div>
            <button
              type="button"
              className="md:hidden p-2 text-gray-700 hover:text-[#015551]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <BiMenu className="h-6 w-6 hover:cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-black/50 transition-opacity duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        />
        <div 
          className={`relative w-64 h-full bg-[#015551] transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="px-4 py-6 space-y-4">
            <Link to="/" className="block text-white hover:bg-[#01403d] px-2 py-1 rounded">
              Home
            </Link>
            <Link to="/features" className="block text-white hover:bg-[#01403d] px-2 py-1 rounded">
              Features
            </Link>
            <Link to="/contact" className="block text-white hover:bg-[#01403d] px-2 py-1 rounded">
              Contact
            </Link>
            <Link
              to="/post"
              className="block text-center text-white bg-[#01403d] hover:bg-[#01302e] px-4 py-2 rounded"
            >
              New post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;