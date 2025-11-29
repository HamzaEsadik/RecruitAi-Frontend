import { FiUsers, FiTrendingUp, FiAward, FiTarget } from 'react-icons/fi';

/**
 * StatsCard Component
 * Displays a metric card with icon, label, and value
 * 
 * @param {string} label - Card label/title
 * @param {string|number} value - Metric value to display
 * @param {string} icon - Icon type (users, trending, award, target, custom)
 * @param {React.Component} customIcon - Custom icon component
 * @param {string} color - Color theme (primary, success, warning, info)
 * @param {string} trend - Optional trend indicator (up, down)
 * @param {string} trendValue - Optional trend value to display
 * @param {string} className - Additional classes
 */
function StatsCard({
  label,
  value,
  icon = 'users',
  customIcon,
  color = 'primary',
  trend,
  trendValue,
  className = '',
}) {
  // Map icon names to icon components
  const icons = {
    users: FiUsers,
    trending: FiTrendingUp,
    award: FiAward,
    target: FiTarget,
  };

  // Use custom icon or predefined icon
  const Icon = customIcon || icons[icon] || FiUsers;

  // Define color schemes for different themes
  const colorThemes = {
    primary: {
      bg: 'bg-[#015551]/10',
      text: 'text-[#015551]',
      icon: 'text-[#015551]',
    },
    success: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      icon: 'text-green-600',
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
      icon: 'text-yellow-600',
    },
    info: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      icon: 'text-blue-600',
    },
  };

  // Select theme based on color prop
  const theme = colorThemes[color] || colorThemes.primary;

  // Render trend indicator (up/down arrow with value)
  const getTrendIcon = () => {
    // Positive trend (green arrow up)
    if (trend === 'up') {
      return (
        <span className="flex items-center text-green-600 text-sm">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          {trendValue}
        </span>
      );
    }
    // Negative trend (red arrow down)
    if (trend === 'down') {
      return (
        <span className="flex items-center text-red-600 text-sm">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          {trendValue}
        </span>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`${theme.bg} p-3 rounded-full`}>
          <Icon className={theme.icon} size={24} />
        </div>
        {trend && getTrendIcon()}
      </div>
      
      <h3 className="text-gray-500 text-sm font-medium mb-1">
        {label}
      </h3>
      
      <p className={`text-3xl font-bold ${theme.text}`}>
        {value}
      </p>
    </div>
  );
}

export default StatsCard;
