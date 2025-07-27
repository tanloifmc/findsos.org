import React, { useEffect, useRef } from 'react';

const AdSenseAd = ({ 
  adSlot, 
  adFormat = 'auto', 
  adLayout = '',
  adLayoutKey = '',
  style = {},
  className = '',
  responsive = true 
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      // Check if AdSense script is loaded
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // Push the ad to AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  const defaultStyle = {
    display: 'block',
    ...style
  };

  return (
    <div className={`adsense-container ${className}`} style={{ textAlign: 'center', margin: '20px 0' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

// Predefined ad components for common placements
export const HeaderBannerAd = ({ className = '' }) => (
  <AdSenseAd
    adSlot="1234567890" // Replace with your ad slot ID
    adFormat="auto"
    className={`header-banner-ad ${className}`}
    style={{ minHeight: '90px' }}
  />
);

export const SidebarAd = ({ className = '' }) => (
  <AdSenseAd
    adSlot="2345678901" // Replace with your ad slot ID
    adFormat="rectangle"
    className={`sidebar-ad ${className}`}
    style={{ width: '300px', height: '250px' }}
  />
);

export const InContentAd = ({ className = '' }) => (
  <AdSenseAd
    adSlot="3456789012" // Replace with your ad slot ID
    adFormat="fluid"
    adLayout="in-article"
    className={`in-content-ad ${className}`}
    style={{ minHeight: '200px' }}
  />
);

export const FooterBannerAd = ({ className = '' }) => (
  <AdSenseAd
    adSlot="4567890123" // Replace with your ad slot ID
    adFormat="auto"
    className={`footer-banner-ad ${className}`}
    style={{ minHeight: '90px' }}
  />
);

export const MobileBannerAd = ({ className = '' }) => (
  <AdSenseAd
    adSlot="5678901234" // Replace with your ad slot ID
    adFormat="banner"
    className={`mobile-banner-ad ${className}`}
    style={{ width: '320px', height: '50px' }}
  />
);

export const ResponsiveAd = ({ adSlot, className = '', minHeight = '200px' }) => (
  <AdSenseAd
    adSlot={adSlot}
    adFormat="auto"
    className={`responsive-ad ${className}`}
    style={{ minHeight }}
    responsive={true}
  />
);

export default AdSenseAd;

