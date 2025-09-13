
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function AdScripts() {
  useEffect(() => {
    // This effect will run only on the client side, after the component mounts
    // and after consent has been given.
    
    // Hilltop Ads Pop-under Script
    const popUnder = document.createElement('script');
    (popUnder as any).settings = {};
    popUnder.src = "//handsome-storm.com/bUXiV.sNdRG/ll0jYRWQcc/-eYmH9QuZZXUll/kiPqTtY2AMGzsQHzTNAT-kKtiN/jrYzzuNvDuM/2qMEAM";
    popUnder.async = true;
    popUnder.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(popUnder);

    // Monetag Script
    const monetagScript = document.createElement('script');
    monetagScript.innerHTML = `(s=>{s.dataset.zone='9810543',s.src='https://vemtoutcheeg.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;
    document.body.appendChild(monetagScript);

    // Monetag Interstitial Ad Script
    const interstitialScript = document.createElement('script');
    interstitialScript.innerHTML = `(s=>{s.dataset.zone=9805964,s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;
    document.body.appendChild(interstitialScript);

    return () => {
      // Cleanup scripts on component unmount
      if (document.body.contains(popUnder)) {
        document.body.removeChild(popUnder);
      }
       if (document.body.contains(monetagScript)) {
        document.body.removeChild(monetagScript);
      }
       if (document.body.contains(interstitialScript)) {
        document.body.removeChild(interstitialScript);
      }
    };
  }, []);

  return null; // This component does not render any visible content
}
