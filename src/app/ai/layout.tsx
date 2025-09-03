
import Script from 'next/script';

export default function AiToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="adsterra-social-bar"
        strategy="afterInteractive"
        src="//chickenadjacent.com/f4/bf/1b/f4bf1ba199807a6dcc09287c2ec74dd5.js"
      />
    </>
  );
}
