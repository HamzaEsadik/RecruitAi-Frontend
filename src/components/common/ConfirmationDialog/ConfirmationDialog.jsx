import { FiAlertTriangle, FiTrash2, FiAlertCircle } from 'react-icons/fi';

/**
 * ConfirmationDialog Component
 * Reusable confirmation dialog for destructive actions
 * 
 * @param {boolean} isOpen - Whether dialog is open
 * @param {function} onClose - Close handler
 * @param {function} onConfirm - Confirm action handler
 * @param {string} title - Dialog title
 * @param {string} message - Confirmation message
 * @param {string} confirmText - Confirm button text
 * @param {string} cancelText - Cancel button text
 * @param {string} type - Dialog type (danger, warning, info)
 * @param {boolean} loading - Loading state for confirm button
 */
function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  loading = false,
}) {
  if (!isOpen) return null;

  // Configuration for different dialog types
  const typeConfig = {
    danger: {
      icon: FiTrash2,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-100',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: FiAlertTriangle,
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-100',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
    },
    info: {
      icon: FiAlertCircle,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-100',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  // Get configuration based on type
  const config = typeConfig[type] || typeConfig.danger;
  const Icon = config.icon;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative z-10">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 ${config.iconBg} p-3 rounded-full`}>
            <Icon className={config.iconColor} size={24} />
          </div>
          
          <div className="flex-1">
            <h3 id="dialog-title" className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 text-sm">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${config.buttonColor}`}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
      {/* Modal Overlay */}
      <div className='w-full h-full bg-black opacity-75 fixed top-0 left-0 z-0'></div>
    </div>
  );
}

export default ConfirmationDialog;
