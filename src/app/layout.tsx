
import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';


export const metadata: Metadata = {
  title: 'BoomerHub',
  description: 'Learn Skills. Earn Income. Get Certified.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="d91221cdd32ab4af19a78603576153e265e34cd7" content="d91221cdd32ab4af19a78603576153e265e34cd7" />
        <meta name="monetag" content="b94362744cd3ba95e527b00f595826f5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
          <Script id="monetag-push" strategy="afterInteractive" src="https://couphaithuph.net/act/files/tag.min.js?z=9805952" data-cfasync="false" async />
          <Script id="monetag-vignette" strategy="afterInteractive">
            {`(s=>{s.dataset.zone=9805964,s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
          </Script>
      </body>
    </html>
  );
}
