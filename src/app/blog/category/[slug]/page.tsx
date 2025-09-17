
import { notFound } from 'next/navigation';
import { getAllPosts } from '@/services/post-service';
import { getCategoryBySlug, getAllCategories } from '@/services/category-service';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, Tv, Code, Briefcase, Rocket, BarChart, Newspaper, Gamepad, Trophy, TrendingUp, Plane, Edit } from 'lucide-react';
import AdsterraBanner from '@/components/ads/adsterra-banner';
import PaginationControls from '@/components/blog/pagination-controls';
import PostGrid from '@/components/blog/post-grid';
import type { Metadata, ResolvingMetadata } from 'next';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  DollarSign, Tv, Code, Briefcase, Rocket, BarChart, Newspaper, Gamepad, Trophy, TrendingUp, Plane, Edit,
};

const POSTS_PER_PAGE = 9; // Use 9 for a 3x3 grid with ad
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boomerhub.com';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Generate dynamic metadata for each category page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  const allPosts = await getAllPosts();
  const postsCount = allPosts.filter((p) => p.categorySlug === slug).length;
  const description = `Explore ${postsCount} insightful articles about ${category.name}. Learn from expert insights on ${category.name.toLowerCase()} at BoomerHub.`;

  return {
    title: `${category.name} Articles & Insights`,
    description: description,
    keywords: [category.name, 'articles', 'insights', 'boomerhub', category.name.toLowerCase()],
    openGraph: {
      title: `${category.name} Articles & Insights | BoomerHub`,
      description: description,
      url: `${siteUrl}/blog/category/${category.slug}`,
      siteName: 'BoomerHub',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${category.name} Articles & Insights | BoomerHub`,
      description: description,
    },
    alternates: {
      canonical: `${siteUrl}/blog/category/${category.slug}`,
    },
  }
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function BlogCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  
  if (slug === 'betting-predictions') {
    // This is handled by a dedicated page, but we add a check here as a safeguard.
    notFound();
  }

  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const postsForCategory = allPosts.filter((p) => p.categorySlug === slug);
  const Icon = iconMap[category.iconName] || DollarSign;

  const currentPage = Number(sp?.page) || 1;
  const totalPages = Math.ceil(postsForCategory.length / POSTS_PER_PAGE);

  const paginatedPosts = postsForCategory.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
      <header className="text-center mb-12">
        <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">{category.name}</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Browse all articles in the "{category.name}" category.
        </p>
      </header>

      <AdsterraBanner />
      
      <PostGrid posts={paginatedPosts} includeAd={true} />

      <div className="mt-12">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={`/blog/category/${slug}`}
        />
      </div>
    </div>
  );
}
