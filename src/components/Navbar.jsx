import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pendingSectionRef = useRef(null);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scrolling to section after navigation
  useEffect(() => {
    if (pendingSectionRef.current && location.pathname === '/') {
      const sectionId = pendingSectionRef.current;
      pendingSectionRef.current = null;
      
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname]);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    // Close mobile menu
    setIsOpen(false);
    
    // If we're already on the home page
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home and then scroll
      pendingSectionRef.current = sectionId;
      navigate('/');
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    // Close mobile menu
    setIsOpen(false);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-[#FFFDF6] py-6'}`}>
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={scrollToTop} className="text-2xl font-bold text-[#015551]">
              RecruitAi
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="text-gray-700 hover:text-[#015551] transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/#features" 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-[#015551] transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/#contact" 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-[#015551] transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-[#015551] transition-colors"
            >
              About
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/post"
              className="px-4 py-2 bg-[#015551] text-white rounded-lg hover:bg-[#01403d] transition-all font-medium"
            >
              Post a Job
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#015551] focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-white transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out pt-20`}
      >
        {/* Close button for mobile menu */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 text-gray-700 hover:text-[#015551] focus:outline-none"
        >
          <FaTimes className="h-6 w-6" />
        </button>
        
        <div className="flex flex-col items-center space-y-6 p-6">
          <Link 
            to="/" 
            onClick={scrollToTop}
            className="text-xl text-gray-700 hover:text-[#015551] transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/#features" 
            onClick={() => scrollToSection('features')}
            className="text-xl text-gray-700 hover:text-[#015551] transition-colors"
          >
            Features
          </Link>
          <Link 
            to="/#contact" 
            onClick={() => scrollToSection('contact')}
            className="text-xl text-gray-700 hover:text-[#015551] transition-colors"
          >
            Contact
          </Link>
          <Link 
            to="/about" 
            className="text-xl text-gray-700 hover:text-[#015551] transition-colors"
          >
            About
          </Link>
          <Link
            to="/post"
            className="px-6 py-3 bg-[#015551] text-white rounded-lg hover:bg-[#01403d] transition-all font-medium mt-4"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;