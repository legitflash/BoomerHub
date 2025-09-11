// This layout is specifically for the Sanity Studio.
// It ensures that the studio takes up the full screen and has a clean slate.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
