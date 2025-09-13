
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AdScripts from '@/app/ad-scripts';

// Helper function to handle cookies
const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};


export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    const consentCookie = getCookie('cookie_consent');
    if (consentCookie === 'true') {
      setConsentGiven(true);
      setShowBanner(false);
    } else if (consentCookie === 'false') {
      setConsentGiven(false);
      setShowBanner(false);
    } else {
      setConsentGiven(null);
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookie_consent', 'true', 365);
    setConsentGiven(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie('cookie_consent', 'false', 365);
    setConsentGiven(false);
    setShowBanner(false);
  };

  // Conditionally render AdScripts based on consent
  const AdManager = () => {
    if (consentGiven === true) {
      return <AdScripts />;
    }
    return null;
  };

  if (!showBanner) {
    return <AdManager />;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary/95 p-4 shadow-lg backdrop-blur-sm animate-in slide-in-from-bottom-full">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground">
            We use cookies to improve your experience and display relevant ads. By clicking "Accept," you agree to our use of cookies. Read our{' '}
            <Link href="/privacy-policy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex-shrink-0 flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Decline
            </Button>
            <Button size="sm" onClick={handleAccept}>
              Accept
            </Button>
          </div>
        </div>
      </div>
      {/* We still render AdManager here in case the banner is dismissed by other means */}
      <AdManager />
    </>
  );
}
