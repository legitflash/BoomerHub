
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function AdScripts() {
  useEffect(() => {
    // Hilltop Ads Script
    const s = document.createElement('script');
    s.settings = {};
    s.src = "//coldquit.com/c/DJ9-6Jb.2c5/ltSfWQQ-9/NijcYAzNNTj-IZ4aMeSO0T2BNlj/MA2tM/j/gYys";
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(s);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(s);
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
