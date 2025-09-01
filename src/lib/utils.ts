import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let isPopunderTriggered = false;

export function triggerPopunder() {
  if (typeof window !== 'undefined' && !isPopunderTriggered) {
    const script = document.createElement('script');
    script.dataset.zone = '9805954';
    script.src = 'https://al5sm.com/tag.min.js';
    script.onload = () => {
      // The script itself handles the popunder logic.
      // We just need to ensure it's added to the page only once per session.
      console.log('Popunder script loaded.');
    };
    script.onerror = () => {
      console.error('Failed to load popunder script.');
      isPopunderTriggered = false; // Allow retrying if it fails to load
    };

    const target = [document.documentElement, document.body].filter(Boolean).pop();
    if (target) {
      // The original script was self-invoking by passing the appended script as an argument.
      // We replicate that behavior by creating the script and then immediately calling the IIFE logic.
      (s => {
        s.dataset.zone = '9805954';
        s.src = 'https://al5sm.com/tag.min.js';
      })(target.appendChild(document.createElement('script')));
      isPopunderTriggered = true;
    }
  }
}
