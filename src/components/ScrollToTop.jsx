import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to scroll the window to the top when the route changes.
 */
function ScrollToTop() {
  const { pathname } = useLocation(); 
  
  // Scrolls to the top when pathname changes.
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [pathname]); 
  
  return null; 
}

export default ScrollToTop;