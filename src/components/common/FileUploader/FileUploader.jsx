import { useState, useRef } from 'react';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';

/**
 * FileUploader Component
 * File upload component with drag & drop, validation, and preview
 * 
 * @param {File} file - Current file
 * @param {function} onChange - Callback when file changes
 * @param {Array} acceptedTypes - Accepted file types (e.g., ['.pdf', '.doc', '.docx'])
 * @param {number} maxSizeMB - Maximum file size in MB
 * @param {string} label - Label text
 * @param {string} error - Error message
 * @param {string} className - Additional classes
 */
function FileUploader({
  file,
  onChange,
  acceptedTypes = ['.pdf', '.doc', '.docx'],
  maxSizeMB = 2,
  label = 'Upload File',
  error,
  className = '',
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Validate file size and type
  const validateFile = (selectedFile) => {
    if (!selectedFile) return null;

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (selectedFile.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    // Check file type
    const extension = '.' + selectedFile.name.split('.').pop().toLowerCase();
    if (!acceptedTypes.includes(extension)) {
      return `File type must be one of: ${acceptedTypes.join(', ')}`;
    }

    return null;
  };

  // Handle file selection from input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validationError = validateFile(selectedFile);
    
    if (validationError) {
      alert(validationError);
      return;
    }

    onChange(selectedFile);
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    const validationError = validateFile(droppedFile);
    
    if (validationError) {
      alert(validationError);
      return;
    }

    onChange(droppedFile);
  };

  // Remove uploaded file
  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Trigger file input click
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
      )}

      {/* Show upload area or file preview */}
      {!file ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#015551] bg-[#015551]/5'
              : 'border-gray-300 hover:border-[#015551] hover:bg-gray-50'
          } ${error ? 'border-red-500' : ''}`}
        >
          <FiUpload className="mx-auto mb-3 text-gray-400" size={32} />
          <p className="text-gray-600 mb-1">
            Drag and drop your file here, or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Accepted formats: {acceptedTypes.join(', ')} (Max {maxSizeMB}MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept={acceptedTypes.join(',')}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <FiFile className="text-[#015551]" size={24} />
            <div>
              <p className="text-sm font-medium text-gray-700">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Remove file"
          >
            <FiX className="text-gray-600" size={20} />
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export default FileUploader;
