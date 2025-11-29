/**
 * Badge Component
 * Reusable badge for displaying skills, status, tags, etc.
 * 
 * @param {string} text - Badge text content
 * @param {string} variant - Badge style variant (skill, status, score, default)
 * @param {function} onRemove - Optional remove handler (shows X button)
 * @param {string} color - Custom background color
 * @param {string} className - Additional classes
 */
function Badge({ 
  text, 
  variant = 'default', 
  onRemove, 
  color,
  className = '' 
}) {
  // Define color variants for different badge types
  const variants = {
    skill: 'bg-[#C1CFA1] text-gray-800',
    status: 'bg-blue-100 text-blue-800',
    score: 'bg-green-100 text-green-800',
    favorite: 'bg-yellow-100 text-yellow-800',
    default: 'bg-gray-100 text-gray-800',
  };

  // Base styling for all badges
  const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2';
  const variantClasses = variants[variant] || variants.default;
  const customColorStyle = color ? { backgroundColor: color } : {};

  return (
    <span 
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={customColorStyle}
    >
      {text}
      {/* Show remove button if onRemove handler is provided */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-current hover:text-gray-700 transition-colors ml-1"
          aria-label={`Remove ${text}`}
        >
          ×
        </button>
      )}
    </span>
  );
}

export default Badge;
