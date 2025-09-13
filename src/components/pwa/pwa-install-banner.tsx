
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PwaInstallBanner() {
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      
      const promptEvent = e as BeforeInstallPromptEvent;

      const dismissed = sessionStorage.getItem('pwa_install_dismissed');
      if (dismissed) {
        return;
      }

      const handleInstallClick = () => {
        promptEvent.prompt();
        promptEvent.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
        });
      };
      
      const { dismiss } = toast({
        title: "Install BoomerHub App",
        description: "Get a faster, app-like experience on your device.",
        duration: Infinity, // Keep the toast open until the user interacts with it
        action: (
          <Button size="sm" onClick={handleInstallClick}>
            <Download className="mr-2 h-4 w-4" />
            Install
          </Button>
        ),
        onOpenChange: (open) => {
            if (!open) {
                // If the user closes the toast without clicking "Install"
                sessionStorage.setItem('pwa_install_dismissed', 'true');
            }
        }
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [toast]);

  // This component no longer renders anything itself; it just triggers the toast.
  return null;
}
