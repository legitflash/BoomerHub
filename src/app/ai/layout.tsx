
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
        src="//chickenadjacent.com/c7/ac/cf/c7accf076d6c5d479539d4b53ac9f961.js"
      />
    </>
  );
}
