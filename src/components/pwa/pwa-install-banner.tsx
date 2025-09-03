
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PwaInstallBanner() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const dismissed = sessionStorage.getItem('pwa_install_dismissed');
      if (dismissed) {
        return;
      }
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) {
      return;
    }
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Hide the banner regardless of the choice
      setIsVisible(false);
      setInstallPrompt(null);
    });
  };

  const handleDismissClick = () => {
    setIsVisible(false);
    // Remember the user's choice for the current session
    sessionStorage.setItem('pwa_install_dismissed', 'true');
  };

  if (!isVisible || !installPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-10 sm:max-w-md sm:left-auto sm:right-4">
      <Card className="shadow-2xl">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="flex-grow">
            <p className="font-semibold">Install BoomerHub App</p>
            <p className="text-sm text-muted-foreground">Get a faster, app-like experience on your device.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleInstallClick}>
              <Download className="mr-2 h-4 w-4" />
              Install
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDismissClick} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
