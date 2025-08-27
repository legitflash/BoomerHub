
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { getSavedPostsForUser } from '@/services/saves-service';
import type { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loader2, BookmarkX } from 'lucide-react';

export default function SavedPostsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/login?redirect=/profile/saved-posts');
      } else {
        const fetchSavedPosts = async () => {
          setIsLoading(true);
          try {
            const posts = await getSavedPostsForUser(user.uid);
            setSavedPosts(posts);
          } catch (error) {
            console.error("Failed to fetch saved posts:", error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchSavedPosts();
      }
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="container py-12 md:py-24 flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">My Saved Posts</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Your personal collection of articles to read later.
        </p>
      </header>
      
      {savedPosts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {savedPosts.map((post) => (
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
                  <span>{post.author}</span>
                  <span>&middot;</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
          <BookmarkX className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Saved Posts Yet</h2>
          <p className="text-muted-foreground mb-6">You haven't saved any articles. Start exploring and save articles for later!</p>
          <Button asChild>
            <Link href="/blog">Explore Articles</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
