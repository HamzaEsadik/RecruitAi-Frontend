import { Link } from 'react-router-dom';

/**
 * Header component.
 * Displays the site logo and main navigation.
 */
function Header() {
  return (
    <nav className="bg-[#FFFDF6] border-b border-gray-200">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#015551]">
              RecruitAi
            </Link>
          </div>
          {/* Navigation Links (if any) */}
        </div>
      </div>
    </nav>
  );
}

export default Header;