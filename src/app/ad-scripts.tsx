'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function AdScripts() {
  useEffect(() => {
    // Hilltop Ads Pop-under Script
    const popUnder = document.createElement('script');
    popUnder.settings = {};
    popUnder.src = "//coldquit.com/cND/9s6.bj2u5XlxSeWpQp9iNbjDYgzRNXTtA_3_O/S/0K2/NXjtMz1/MlDRg_wl";
    popUnder.async = true;
    popUnder.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(popUnder);

    // Hilltop Ads Video Slider Script
    const videoSlider = document.createElement('script');
    videoSlider.settings = {};
    videoSlider.src = "//handsome-storm.com/bWXYVWs.dBGklV0SY/Wgcy/feAm/9/u/ZrUxltkxPDTHY-2_MyziQZzpNMTLkMtON/jFYNzVN/DoMf2GMrAK";
    videoSlider.async = true;
    videoSlider.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(videoSlider);

    return () => {
      // Cleanup scripts on component unmount
      if (document.body.contains(popUnder)) {
        document.body.removeChild(popUnder);
      }
      if (document.body.contains(videoSlider)) {
        document.body.removeChild(videoSlider);
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
