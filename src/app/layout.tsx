
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/layout/theme-provider';
import PwaInstallBanner from '@/components/pwa/pwa-install-banner';
import NewsletterSignup from '@/components/layout/newsletter-signup';
import NavigationMenu from '@/components/layout/navigation-menu';
import CookieConsentBanner from '@/components/layout/cookie-consent-banner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boomerhub.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BoomerHub - Insights for Growth',
    template: '%s | BoomerHub',
  },
  description: 'Your all-in-one platform for insightful articles, powerful AI tools, and skill development.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BoomerHub',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'BoomerHub - Insights for Growth',
    description: 'Your all-in-one platform for insightful articles, powerful AI tools, and skill development.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'BoomerHub Hero Image',
      },
    ],
    siteName: 'BoomerHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BoomerHub - Insights for Growth',
    description: 'Your all-in-one platform for insightful articles, powerful AI tools, and skill development.',
    images: [`${siteUrl}/og-image.png`],
    creator: '@legitflash_',
  },
};


export const viewport: Viewport = {
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head />
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="relative flex min-h-screen flex-col">
              <NavigationMenu />
              <main id="main-content" className="flex-1" role="main">{children}</main>
              <NewsletterSignup />
              <Footer />
            </div>
            <Toaster />
            <PwaInstallBanner />
            <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
