
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/services/page-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortableText } from 'next-sanity';

export default async function CustomPage({ params }: { params: { slug: string } }) {
  // A simple check to avoid trying to render known static routes with this dynamic page.
  const staticRoutes = ['about', 'contact', 'advertise-with-us', 'write-for-us', 'privacy-policy', 'terms-of-use'];
  if (staticRoutes.includes(params.slug) || params.slug.startsWith('ai') || params.slug.startsWith('blog') || params.slug.startsWith('admin')) {
    notFound();
  }

  const page = await getPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            {page.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <PortableText value={page.content} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
