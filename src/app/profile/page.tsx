
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { handleGetSavedPosts } from '@/app/actions';
import type { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, Bookmark, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchSavedPosts = async () => {
        setIsLoadingPosts(true);
        const posts = await handleGetSavedPosts(user.uid);
        setSavedPosts(posts);
        setIsLoadingPosts(false);
      };
      fetchSavedPosts();
    } else if (!isAuthLoading) {
      // If auth is not loading and there's no user, stop loading posts.
      setIsLoadingPosts(false);
    }
  }, [user, isAuthLoading]);

  if (isAuthLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">Please sign in to view your profile.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-12 md:py-16">
      <header className="flex flex-col items-center text-center mb-12">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.photoURL || undefined} alt={user.email || 'User'} />
          <AvatarFallback>
            <UserCircle className="h-16 w-16" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold tracking-tighter font-headline">My Profile</h1>
        <p className="text-muted-foreground text-lg mt-2">{user.email}</p>
      </header>
      
      <main>
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tighter font-headline mb-8 flex items-center gap-2">
                <Bookmark/> Saved Articles
            </h2>
            {isLoadingPosts ? (
                 <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="mt-2 text-muted-foreground">Loading your saved articles...</p>
                </div>
            ) : savedPosts.length > 0 ? (
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
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">You haven't saved any articles yet.</p>
                     <Button asChild variant="link">
                        <Link href="/blog">Explore Articles</Link>
                    </Button>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
