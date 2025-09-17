
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, DollarSign, Tv, Code, Briefcase, Rocket, BarChart, Newspaper, Gamepad, Trophy, TrendingUp, Plane, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAllPosts } from '@/services/post-service';
import { getAllCategories } from '@/services/category-service';
import HeroSearch from '@/components/home/hero-search';
import AdsterraBanner from '@/components/ads/adsterra-banner';
import type { Post } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import PostCard from '@/components/blog/post-card';
import placeholderImageData from '@/lib/placeholder-images.json';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  DollarSign, Tv, Code, Briefcase, Rocket, BarChart, Newspaper, Gamepad, Trophy, TrendingUp, Plane, Edit,
};

// Helper function to get the top 3 recent posts for a specific category slug
const getRecentPostsByCategory = (posts: Post[], categorySlug: string, count: number): Post[] => {
  return posts
    .filter(post => post.categorySlug === categorySlug)
    .slice(0, count);
};


export default async function Home() {
  const allPosts = await getAllPosts();
  const allCategories = await getAllCategories();
  
  const featuredPost = allPosts[0]; // The latest post is the featured one
  const otherPosts = allPosts.slice(1);
  const heroImage = placeholderImageData.hero;

  return (
    <>
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="pt-12 md:pt-24" id="hero-search">
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
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              data-ai-hint={heroImage.dataAiHint}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Post & Recent Posts Section */}
      <section className="container px-4 md:px-6">
        {/* Featured Post - More Compact */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tighter font-headline mb-6">Featured Post</h2>
            <Card className="group overflow-hidden">
              <div className="grid md:grid-cols-[2fr_1fr] gap-6 p-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit">{featuredPost.category}</Badge>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">{featuredPost.title}</h3>
                  </Link>
                  <p className="text-muted-foreground line-clamp-2">{featuredPost.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={featuredPost.authorImage} alt={featuredPost.author} />
                        <AvatarFallback>{featuredPost.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{featuredPost.author}</p>
                        <p>{featuredPost.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      width={400}
                      height={300}
                      data-ai-hint={featuredPost.dataAiHint}
                      className="w-full h-full object-cover aspect-video rounded-lg"
                      priority
                    />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Recent Posts - Above the fold content */}
        {otherPosts.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-between items-baseline mb-6">
              <h2 className="text-3xl font-bold tracking-tighter font-headline">Recent Posts</h2>
              <Button variant="link" asChild>
                <Link href="/blog">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.slice(0, 6).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Top Categories Section */}
      <section className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 font-headline">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {allCategories.filter(c => !c.isAiTool).slice(0, 4).map((category) => {
            const Icon = iconMap[category.iconName] || DollarSign;
            return (
             <Link key={category.slug} href={`/blog/category/${category.slug}`}>
              <Card className="flex flex-col items-center justify-center p-6 text-center hover:shadow-lg transition-shadow h-full">
                <Icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="font-semibold">{category.name}</h3>
              </Card>
            </Link>
          )})}
        </div>
      </section>
      
      <AdsterraBanner />

      {/* Category Sections */}
      {allCategories.filter(c => !c.isAiTool).map(category => {
        const recentPosts = getRecentPostsByCategory(otherPosts, category.slug, 3);
        if (recentPosts.length === 0) return null;

        return (
          <section key={category.slug} className="container px-4 md:px-6">
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="text-3xl font-bold tracking-tighter font-headline">{category.name}</h2>
              <Button variant="link" asChild>
                <Link href={`/blog/category/${category.slug}`}>View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
    </>
  );
}
