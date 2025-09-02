'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function AdScripts() {
  useEffect(() => {
    // Hilltop Ads Script
    const s = document.createElement('script');
    s.settings = {};
    s.src = "//coldquit.com/cTD/9s6.bd2e5QlnSfWBQf9sN_jLYCzdNDTeAu3MOOSe0p2/NBjqMv1ZMUDhggwN";
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(s);

    return () => {
      // Cleanup script on component unmount
      if (document.body.contains(s)) {
        document.body.removeChild(s);
      }
    };
  }, []);

  return (
    <>
      {/* Monetag Script */}
      <Script id="monetag-script">
        {`(s=>{s.dataset.zone='9810543',s.src='https://vemtoutcheeg.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
      </Script>
    </>
  );
}
