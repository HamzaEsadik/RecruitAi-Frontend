import { Link, useNavigate, useLocation } from 'react-router-dom';

/**
 * Footer component.
 * Displays navigation links, contact information, and copyright.
 */
function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scrolls to the top of the page or navigates to home.
  const scrollToTop = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      navigate('/');
      // Optional: if you want to ensure scroll to top after navigation to home
      // setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
    }
  };

  // Scrolls to a specific section on the home page.
  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home and pass the sectionId in state to scroll after navigation
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="bg-[#FFFDF6] border-t border-gray-200 mt-16">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-[#015551]">
              RecruitAi
            </Link>
            <p className="text-gray-600">
              Revolutionizing recruitment with AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#015551]">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={scrollToTop} 
                className="text-gray-700 hover:text-[#015551] text-left bg-transparent border-none cursor-pointer p-0"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/about')} 
                className="text-gray-700 hover:text-[#015551] text-left bg-transparent border-none cursor-pointer p-0"
              >
                About
              </button>
              <button 
                onClick={() => navigate('/post')} 
                className="text-gray-700 hover:text-[#015551] text-left bg-transparent border-none cursor-pointer p-0"
              >
                Post a Job
              </button>
              <button 
                onClick={() => scrollToSection('contact')} // Assuming 'contact' is an ID on the home page
                className="text-gray-700 hover:text-[#015551] text-left bg-transparent border-none cursor-pointer p-0"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#015551]">Contact Us</h3>
            <div className="text-gray-700">
              <p>Email: hamza.esadik.m@gmail.com</p>
              <p>Phone: +212 716-32-6994</p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          © {new Date().getFullYear()} RecruitAi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;