
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Briefcase, Clock, Code, LineChart, DollarSign, BrainCircuit, Tv, Megaphone, Users, Rocket, BarChart, Newspaper, Droplets, Gamepad, Trophy, TrendingUp, Plane, Rss, Loader2 } from 'lucide-react';
import type { Post, BlogCategory } from '@/lib/types';
import AdsterraBanner from '../ads/adsterra-banner';


interface BlogCategoryClientPageProps {
  category: BlogCategory;
  initialPosts: Post[];
}

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
  Plane,
};

export default function BlogCategoryClientPage({ category, initialPosts }: BlogCategoryClientPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  
  useEffect(() => {
    const results = initialPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, initialPosts]);

  const Icon = iconMap[category.iconName] || DollarSign;
  
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

      <div className="max-w-lg mx-auto mb-12">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                type="text"
                placeholder={`Search in ${category.name}...`}
                className="pl-10 h-12 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>
      
      <AdsterraBanner />
      
      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card key={post.slug} className="group flex flex-col">
              <Link href={`/blog/${post.slug}`} className="block">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  data-ai-hint={post.dataAiHint}
                  className="w-full rounded-t-lg object-cover aspect-video"
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
                  <span>{post.author}</span>
                  <span>&middot;</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No posts found for your search term in this category.</p>
      )}
    </div>
  );
}
