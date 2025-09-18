
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function AdScripts() {
  useEffect(() => {
    // Helper function to safely load external scripts with error handling
    const loadScript = (src: string, onError?: () => void) => {
      try {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.referrerPolicy = 'no-referrer-when-downgrade';
        
        script.onerror = () => {
          console.warn(`Failed to load ad script: ${src}`);
          onError?.();
        };
        
        script.onload = () => {
          console.debug(`Successfully loaded ad script: ${src}`);
        };
        
        document.body.appendChild(script);
        return script;
      } catch (error) {
        console.warn(`Error creating ad script for ${src}:`, error);
        return null;
      }
    };

    // Helper function to safely execute inline scripts
    const executeInlineScript = (code: string, description: string) => {
      try {
        const script = document.createElement('script');
        script.innerHTML = code;
        script.onerror = () => {
          console.warn(`Failed to execute ${description} script`);
        };
        document.body.appendChild(script);
        return script;
      } catch (error) {
        console.warn(`Error executing ${description} script:`, error);
        return null;
      }
    };

    // Load scripts with error handling
    const popUnder = loadScript("//handsome-storm.com/bUXiV.sNdRG/ll0jYRWQcc/-eYmH9QuZZXUll/kiPqTtY2AMGzsQHzTNAT-kKtiN/jrYzzuNvDuM/2qMEAM");
    
    const monetagScript = executeInlineScript(
      `(s=>{s.dataset.zone='9810543',s.src='https://vemtoutcheeg.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
      'Monetag'
    );
    
    const interstitialScript = executeInlineScript(
      `(s=>{s.dataset.zone=9805964,s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
      'Monetag Interstitial'
    );

    return () => {
      // Cleanup scripts on component unmount
      if (popUnder && document.body.contains(popUnder)) {
        document.body.removeChild(popUnder);
      }
      if (monetagScript && document.body.contains(monetagScript)) {
        document.body.removeChild(monetagScript);
      }
      if (interstitialScript && document.body.contains(interstitialScript)) {
        document.body.removeChild(interstitialScript);
      }
    };
  }, []);

  return null; // This component does not render any visible content
}
