
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
          <Script id="hilltop-ads" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
              (function(pufpx){
                var d = document,
                    s = d.createElement('script'),
                    l = d.scripts[d.scripts.length - 1];
                s.settings = pufpx || {};
                s.src = "//handsome-storm.com/bSX.VZsJdLGElm0hYdWMcC/Pe/m/9/u_Z/UllCkaPETUYX2_M/zsU/w/NajxMEtTNrjfY-zBNATiAs2iNaAl";
                s.async = true;
                s.referrerPolicy = 'no-referrer-when-downgrade';
                l.parentNode.insertBefore(s, l);
              })({})
            `
          }} />
           <Script id="monetag-vignette" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(s=>{s.dataset.zone=9805964,s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))` }}/>
           <Script id="monetag-push" src="https://shoukigaigoors.net/act/files/tag.min.js?z=9805952" data-cfasync="false" async></Script>
      </body>
    </html>
  );
}
