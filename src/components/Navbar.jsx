import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 

/**
 * Navbar component.
 * Handles navigation, mobile menu, and scroll effects.
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  const [scrolled, setScrolled] = useState(false); 
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const pendingSectionRef = useRef(null); 

  // Handles navbar style changes on scroll.
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); // Apply scrolled styles
      } else {
        setScrolled(false); // Apply default styles
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Cleanup: remove scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Closes the mobile menu when the route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handles scrolling to a specific section after navigation.
  useEffect(() => {
    if (pendingSectionRef.current && location.pathname === '/') {
      const sectionId = pendingSectionRef.current;
      pendingSectionRef.current = null; // Clear the pending section
      
      // Use a small timeout to ensure the DOM is updated and the element is available
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // 100ms delay, adjust if necessary
    }
  }, [location.pathname]); 

  // Scrolls to a specific section on the page.
  const scrollToSection = (sectionId) => {
    setIsOpen(false); // Close mobile menu if open
    
    if (location.pathname === '/') {
      // If already on the home page, scroll directly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, set the pending section and navigate to home
      // The useEffect above will handle the scroll once on the home page.
      pendingSectionRef.current = sectionId;
      navigate('/');
    }
  };

  // Scrolls to the top of the page.
  const scrollToTop = () => {
    setIsOpen(false); // Close mobile menu if open
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-4' : 'bg-[#FFFDF6] py-6'
      }`}
    >
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={scrollToTop} className="text-2xl font-bold text-[#015551]">
              RecruitAi
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="text-gray-700 hover:text-[#015551] transition-colors"
            >
              Home
            </Link>
            {/* Use an absolute path for section links if they are on the homepage */}
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

          {/* Call to Action Button (Desktop) */}
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
              onClick={() => setIsOpen(!isOpen)} // Toggle mobile menu
              className="text-gray-700 hover:text-[#015551] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" /> // Close icon
              ) : (
                <FaBars className="h-6 w-6" /> // Hamburger icon
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-white transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full' // Slide in/out animation
        } transition-transform duration-300 ease-in-out pt-20`}
      >
        {/* Close button for mobile menu (optional, as main toggle also closes it) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 text-gray-700 hover:text-[#015551] focus:outline-none"
          aria-label="Close menu"
        >
          <FaTimes className="h-6 w-6" />
        </button>
        
        {/* Mobile Navigation Links */}
        <div className="flex flex-col items-center space-y-6 p-6">
          <Link 
            to="/" 
            onClick={scrollToTop} // Uses scrollToTop which also closes menu
            className="text-xl text-gray-700 hover:text-[#015551] transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/#features" 
            onClick={() => scrollToSection('features')} // Uses scrollToSection which also closes menu
            className="text-xl text-gray-700 hover:text-[#015551] transition-colors"
          >
            Features
          </Link>
          <Link 
            to="/#contact" 
            onClick={() => scrollToSection('contact')} // Uses scrollToSection which also closes menu
            className="text-xl text-gray-700 hover:text-[#015551] transition-colors"
          >
            Contact
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)} // Explicitly close menu for direct links
            className="text-xl text-gray-700 hover:text-[#015551] transition-colors"
          >
            About
          </Link>
          <Link
            to="/post"
            onClick={() => setIsOpen(false)} // Explicitly close menu for direct links
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