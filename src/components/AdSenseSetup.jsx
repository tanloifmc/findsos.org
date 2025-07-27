import { useEffect } from 'react';

const AdSenseSetup = ({ publisherId = 'ca-pub-XXXXXXXXXXXXXXXXX' }) => {
  useEffect(() => {
    // Check if AdSense script is already loaded
    if (document.querySelector(`script[src*="adsbygoogle.js"]`)) {
      return;
    }

    // Create and append AdSense script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    script.crossOrigin = 'anonymous';
    
    // Add error handling
    script.onerror = () => {
      console.warn('Failed to load Google AdSense script');
    };
    
    script.onload = () => {
      console.log('Google AdSense script loaded successfully');
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector(`script[src*="adsbygoogle.js"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [publisherId]);

  return null; // This component doesn't render anything
};

export default AdSenseSetup;

