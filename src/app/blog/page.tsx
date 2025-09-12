
import Link from 'next/link';
import { DollarSign, Tv, Code, Briefcase, Rocket, BarChart, Newspaper, Gamepad, Trophy, TrendingUp, Plane, Edit } from 'lucide-react';
import { getAllPosts } from '@/services/post-service';
import { getAllCategories } from '@/services/category-service';
import SearchBar from '@/components/search/search-bar';
import PaginationControls from '@/components/blog/pagination-controls';
import PostGrid from '@/components/blog/post-grid';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  DollarSign, Tv, Code, Briefcase, Rocket, BarChart, Newspaper, Gamepad, Trophy, TrendingUp, Plane, Edit,
};

const POSTS_PER_PAGE = 9; // Changed to 9 to make a 3x3 grid with an ad

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const allPosts = await getAllPosts();
  const blogCategories = await getAllCategories();

  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const uniqueCategories = blogCategories.filter(
    (category, index, self) =>
      index === self.findIndex((c) => c.slug === category.slug)
  );

  return (
    <>
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Our Blog</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Insights on finance, tech, social media, and more.
        </p>
        <div className="max-w-lg mx-auto mt-8">
            <SearchBar />
        </div>
      </header>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
        {uniqueCategories.map(category => {
          const Icon = iconMap[category.iconName] || DollarSign;
          return (
            <Link 
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {category.name}
            </Link>
          )
        })}
      </div>
      
      <PostGrid posts={paginatedPosts} includeAd={true} />
      
      <div className="mt-12">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/blog"
        />
      </div>
    </div>
    </>
  );
}
