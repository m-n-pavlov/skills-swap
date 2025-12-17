import { useState, useEffect } from 'react';

export const useAutoHideFooter = (isEnabled: boolean): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    const handleScroll = () => {
      setIsVisible(window.scrollY >= 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEnabled]);

  return isVisible;
};
