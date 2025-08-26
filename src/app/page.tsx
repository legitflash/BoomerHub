
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import IntelligentSearchForm from '@/components/search/intelligent-search-form';
import { blogPosts, topCategories } from '@/lib/data';

export default function Home() {

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="pt-12 md:pt-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Skill Up. Read Up. Earn Up.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Your journey to financial freedom starts here. Explore our articles to master new skills.
                </p>
              </div>
              <IntelligentSearchForm />
            </div>
            <Image
              src="https://picsum.photos/1200/800"
              alt="Hero"
              width={1200}
              height={800}
              data-ai-hint="learning online"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 font-headline">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {topCategories.map((category) => (
            <Card key={category.name} className="flex flex-col items-center justify-center p-6 text-center hover:shadow-lg transition-shadow">
              <category.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="font-semibold">{category.name}</h3>
            </Card>
          ))}
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="container px-4 md:px-6 pb-12 md:pb-24">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="text-3xl font-bold tracking-tighter font-headline">Latest Blog Posts</h2>
          <Button variant="link" asChild>
            <Link href="/blog">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.slice(0, 4).map((post) => (
            <Card key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  data-ai-hint={post.dataAiHint}
                  className="rounded-t-lg object-cover aspect-video"
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
      </section>
    </div>
  );
}
