import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    // If we're already on the home page
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // If we're on another page, navigate to home
      navigate('/');
    }
  };

  const scrollToSection = (sectionId) => {
    // If we're already on the home page
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home and then scroll
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

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
              <button 
                onClick={scrollToTop} 
                className="text-gray-700 hover:text-[#015551] text-left bg-transparent border-none cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/about')} 
                className="text-gray-700 hover:text-[#015551] text-left bg-transparent border-none cursor-pointer"
              >
                About
              </button>
              <button 
                onClick={() => navigate('/post')} 
                className="text-gray-700 hover:text-[#015551] text-left bg-transparent border-none cursor-pointer"
              >
                Post a Job
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-700 hover:text-[#015551] text-left bg-transparent border-none cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Right - Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#015551]">Contact Us</h3>
            <div className="text-gray-700">
              <p>Email: hamza.esadik.m@gmail.com</p>
              <p>Phone: +212 716-32-6994</p>
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