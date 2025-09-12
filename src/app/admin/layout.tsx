
'use client';
// This layout is specifically for the Sanity Studio.
// It ensures that the studio takes up the full screen and has a clean slate.
import { ThemeProvider } from '@/components/layout/theme-provider';

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
  );
}
