/**
 * FormField Component
 * Reusable form field wrapper with label, input, and error display
 * 
 * @param {string} label - Field label text
 * @param {string} type - Input type (text, email, number, textarea, etc.)
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Input placeholder
 * @param {boolean} required - Whether field is required
 * @param {string} error - Error message to display
 * @param {number} rows - Number of rows for textarea
 * @param {number} min - Minimum value for number inputs
 * @param {object} inputProps - Additional input props
 * @param {React.ReactNode} tooltip - Optional tooltip component
 * @param {string} className - Additional classes for the container
 */
function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows = 4,
  min,
  inputProps = {},
  tooltip,
  className = '',
}) {
  const baseInputClasses = 
    'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all';
  
  const errorClasses = error 
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
    : '';

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={onChange}
          className={`${baseInputClasses} ${errorClasses}`}
          rows={rows}
          placeholder={placeholder}
          required={required}
          {...inputProps}
        />
      );
    }

    if (type === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={onChange}
          className={`${baseInputClasses} ${errorClasses} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
          min={min}
          placeholder={placeholder}
          required={required}
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          {...inputProps}
        />
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`${baseInputClasses} ${errorClasses}`}
        placeholder={placeholder}
        required={required}
        {...inputProps}
      />
    );
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
          {label}
          {required && <span className="text-red-500">*</span>}
          {tooltip}
        </label>
      )}
      {renderInput()}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export default FormField;
