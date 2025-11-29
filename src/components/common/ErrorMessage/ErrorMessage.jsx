import { FiAlertCircle } from 'react-icons/fi';

/**
 * ErrorMessage Component
 * Displays error messages with consistent styling
 * 
 * @param {string} message - Error message to display
 * @param {string} type - Error type (error, warning, info)
 * @param {function} onDismiss - Optional dismiss handler
 * @param {string} className - Additional classes
 */
function ErrorMessage({ 
  message, 
  type = 'error', 
  onDismiss,
  className = '' 
}) {
  if (!message) return null;

  // Define color schemes for different message types
  const typeStyles = {
    error: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  // Icon colors for each type
  const iconColors = {
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  return (
    <div 
      className={`flex items-start gap-3 p-4 rounded-lg border ${typeStyles[type]} ${className}`}
      role="alert"
    >
      <FiAlertCircle className={`flex-shrink-0 mt-0.5 ${iconColors[type]}`} size={20} />
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
      {/* Show dismiss button if handler provided */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-current hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
