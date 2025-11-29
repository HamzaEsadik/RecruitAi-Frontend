import { useEffect } from 'react';

// Custom hook to disable body scroll when modals/overlays are open
const useDisableScroll = (isOpen) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    
    // Disable scroll when open, restore when closed
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = originalOverflow || 'auto';
    };
  }, [isOpen]);
};

export default useDisableScroll;