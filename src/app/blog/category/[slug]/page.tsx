
import { notFound } from 'next/navigation';
import { getAllPosts } from '@/services/post-service';
import { getCategoryBySlug, getAllCategories } from '@/services/category-service';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, Tv, Code, Briefcase, Rocket, BarChart, Newspaper, Gamepad, Trophy, TrendingUp, Plane, Edit } from 'lucide-react';
import AdsterraBanner from '@/components/ads/adsterra-banner';
import PaginationControls from '@/components/blog/pagination-controls';
import PostGrid from '@/components/blog/post-grid';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  DollarSign, Tv, Code, Briefcase, Rocket, BarChart, Newspaper, Gamepad, Trophy, TrendingUp, Plane, Edit,
};

const POSTS_PER_PAGE = 9; // Use 9 for a 3x3 grid with ad

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function BlogCategoryPage({ params, searchParams }: { params: { slug: string }, searchParams: { page?: string } }) {
  const { slug } = params;
  
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

  const currentPage = Number(searchParams?.page) || 1;
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
