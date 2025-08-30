
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import IntelligentSearchForm from '@/components/search/intelligent-search-form';
import { Briefcase, Clock, Code, LineChart, DollarSign, BrainCircuit, Tv, Megaphone, Users, Rocket, BarChart, Newspaper, Droplets, Gamepad, Trophy, TrendingUp } from 'lucide-react';
import { getAllPosts } from '@/services/post-service';
import { getAllCategories } from '@/services/category-service';
import PaginationControls from '@/components/blog/pagination-controls';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  DollarSign,
  Tv,
  Code,
  Briefcase,
  Clock,
  Rocket,
  BarChart,
  Newspaper,
  Droplets,
  Gamepad,
  Trophy,
  TrendingUp,
};

const POSTS_PER_PAGE = 6;

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const allPosts = await getAllPosts();
  const blogCategories = await getAllCategories();

  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Our Blog</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Insights on finance, tech, social media, and more.
        </p>
        <div className="max-w-lg mx-auto mt-8">
            <IntelligentSearchForm />
        </div>
      </header>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
        {blogCategories.map(category => {
          const Icon = iconMap[category.iconName];
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

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post) => (
          <Card key={post.slug} className="group flex flex-col">
            <Link href={`/blog/${post.slug}`} className="block">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                data-ai-hint={post.dataAiHint}
                className="rounded-t-lg object-cover aspect-video"
              />
            </Link>
            <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
              <span className="text-xs font-semibold text-primary uppercase">{post.category}</span>
              <Link href={`/blog/${post.slug}`} className="block">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors flex-grow">{post.title}</h3>
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
              <div className="flex items-center gap-2 pt-4 mt-auto text-xs text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.authorImage} alt={post.author} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <Link href={`/author/${post.authorSlug}`} className="hover:underline">{post.author}</Link>
                <span>&middot;</span>
                <span>{post.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/blog"
        />
      </div>
    </div>
  );
}
