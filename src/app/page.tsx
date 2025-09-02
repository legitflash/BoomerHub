
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { topCategories } from '@/lib/data';
import { getAllPosts } from '@/services/post-service';
import HeroSearch from '@/components/home/hero-search';
import PaginationControls from '@/components/blog/pagination-controls';
import AdsterraBanner from '@/components/ads/adsterra-banner';

const POSTS_PER_PAGE = 10;

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const blogPosts = await getAllPosts();
  
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );


  return (
    <>
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="pt-12 md:pt-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Insights for Growth.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                  Your all-in-one platform for insightful articles, powerful AI tools, and skill development.
                </p>
              </div>
              <div className="w-full max-w-sm mx-auto lg:mx-0">
                <HeroSearch />
              </div>
            </div>
            <Image
              src="https://picsum.photos/1200/800"
              alt="Hero"
              width={1200}
              height={800}
              data-ai-hint="learning online"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 font-headline">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {topCategories.map((category) => (
             <Link key={category.slug} href={`/blog/category/${category.slug}`}>
              <Card className="flex flex-col items-center justify-center p-6 text-center hover:shadow-lg transition-shadow h-full">
                <category.icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="font-semibold">{category.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
      <AdsterraBanner />

      {/* Latest Blog Posts Section */}
      <section className="container px-4 md:px-6 pb-12 md:pb-24">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="text-3xl font-bold tracking-tighter font-headline">Latest Blog Posts</h2>
          <Button variant="link" asChild>
            <Link href="/blog">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedPosts.map((post) => (
            <Card key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  data-ai-hint={post.dataAiHint}
                  className="w-full rounded-t-lg object-cover aspect-video"
                />
              </Link>
              <CardContent className="p-4 space-y-2">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.authorImage} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
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
            baseUrl="/"
            />
        </div>
      </section>
    </div>
    </>
  );
}
