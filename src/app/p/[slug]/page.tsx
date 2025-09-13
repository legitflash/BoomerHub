
import { notFound } from 'next/navigation';
import { getAllPages, getPageBySlug } from '@/services/page-service';
import { PortableText } from 'next-sanity';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boomerhub.com';

// Generate dynamic metadata for each page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.title,
    description: `Learn more about ${page.title} at BoomerHub.`,
    alternates: {
        canonical: `/p/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: `Learn more about ${page.title} at BoomerHub.`,
      url: `/p/${page.slug}`,
      siteName: 'BoomerHub',
      type: 'website',
    },
  }
}

export default async function SanityPage({ params }: Props) {
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
          {page.updatedAt && (
            <CardDescription>
              Last Updated: {page.updatedAt}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <PortableText value={page.content} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export async function generateStaticParams() {
  const pages = await getAllPages();
 
  return pages.map((page) => ({
    slug: page.slug,
  }));
}
