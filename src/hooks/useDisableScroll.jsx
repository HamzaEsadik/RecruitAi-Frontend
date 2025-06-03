import { useEffect } from 'react';

/**
 * Custom hook to disable body scroll.
 * Useful for modals or overlays.
 */
const useDisableScroll = (isOpen) => {
    // Effect to toggle body scroll based on isOpen state.
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        if (isOpen) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = originalOverflow || 'auto'; 
        }

        // Cleanup to restore original scroll behavior.
        return () => {
            document.body.style.overflow = originalOverflow || 'auto';
        };
    }, [isOpen]); 
};

export default useDisableScroll;