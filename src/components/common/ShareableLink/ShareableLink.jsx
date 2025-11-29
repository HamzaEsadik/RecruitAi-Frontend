import { useState } from 'react';
import { FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi';

/**
 * ShareableLink Component
 * Displays a link with copy-to-clipboard functionality
 * 
 * @param {string} url - The URL to share
 * @param {string} label - Label text
 * @param {boolean} showOpenButton - Whether to show "Open" button
 * @param {string} className - Additional classes
 */
function ShareableLink({ 
  url, 
  label = 'Share Link',
  showOpenButton = true,
  className = '' 
}) {
  const [copied, setCopied] = useState(false);

  // Copy URL to clipboard with fallback for older browsers
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Open URL in new tab
  const handleOpen = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
      )}
      
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-50 border rounded-lg">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-[#015551] text-white hover:bg-[#01403d]'}`}
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <FiCheck size={18} />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy size={18} />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>

        {showOpenButton && (
          <button
            type="button"
            onClick={handleOpen}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
            aria-label="Open link"
          >
            <FiExternalLink size={18} />
            <span className="hidden sm:inline">Open</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ShareableLink;
