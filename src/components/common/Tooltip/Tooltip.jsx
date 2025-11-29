import { useState } from 'react';
import { FiInfo, FiHelpCircle } from 'react-icons/fi';

/**
 * Tooltip Component
 * Reusable tooltip with hover/click functionality
 * 
 * @param {React.ReactNode} content - Tooltip content (can be JSX)
 * @param {string} position - Tooltip position (top, bottom, left, right)
 * @param {string} icon - Icon type (info, help)
 * @param {string} className - Additional classes for the icon
 */
function Tooltip({ 
  content, 
  position = 'top', 
  icon = 'info',
  className = '' 
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Position classes for tooltip placement
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-0',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-0',
    left: 'right-full top-1/2 -translate-y-1/2 mr-0',
    right: 'left-full top-1/2 -translate-y-1/2 ml-0',
  };

  // Select icon based on type
  const Icon = icon === 'help' ? FiHelpCircle : FiInfo;

  // Shared event handlers to prevent tooltip from closing when hovering
  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <span
      className={`relative group ${className}`}
      tabIndex={0}
      onClick={() => setShowTooltip((prev) => !prev)}
      onBlur={() => setShowTooltip(false)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
      
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute ${positions[position]} w-64 bg-white text-gray-700 text-sm rounded-lg shadow-lg p-4 z-20 transition-opacity ${
          showTooltip ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {content}
      </div>
    </span>
  );
}

export default Tooltip;
