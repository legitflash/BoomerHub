
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function AdScripts() {
  useEffect(() => {
    // Hilltop Ads Pop-under Script
    const popUnder = document.createElement('script');
    (popUnder as any).settings = {};
    popUnder.src = "//handsome-storm.com/bUXiV.sNdRG/ll0jYRWQcc/-eYmH9QuZZXUll/kiPqTtY2AMGzsQHzTNAT-kKtiN/jrYzzuNvDuM/2qMEAM";
    popUnder.async = true;
    popUnder.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(popUnder);

    return () => {
      // Cleanup scripts on component unmount
      if (document.body.contains(popUnder)) {
        document.body.removeChild(popUnder);
      }
    };
  }, []);

  return (
    <>
      {/* Monetag Script */}
      <Script id="monetag-script">
        {`(s=>{s.dataset.zone='9810543',s.src='https://vemtoutcheeg.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
      </Script>
       {/* Monetag Interstitial Ad Script */}
      <Script id="monetag-interstitial-script">
        {`(s=>{s.dataset.zone=9805964,s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
      </Script>
    </>
  );
}
