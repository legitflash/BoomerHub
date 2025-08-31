
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { handleGetSavedPosts, handleGetNotifications } from '@/app/actions';
import type { Post, Notification } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, Bookmark, UserCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SavedPostsList({ posts }: { posts: Post[] }) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">You haven't saved any articles yet.</p>
                <Button asChild variant="link">
                    <Link href="/blog">Explore Articles</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
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
    );
}

function NotificationsList({ notifications }: { notifications: Notification[] }) {
    if (notifications.length === 0) {
        return (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">You have no new notifications.</p>
                <p className="text-sm text-muted-foreground">Follow categories on the blog to get notified about new posts.</p>
                 <Button asChild variant="link">
                    <Link href="/blog">Browse Categories</Link>
                </Button>
            </div>
        );
    }
    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <Link key={notification.id} href={`/blog/${notification.postSlug}`}>
                    <Card className="hover:bg-accent transition-colors">
                        <CardContent className="p-4 flex items-center gap-4">
                            <Bell className="h-6 w-6 text-primary" />
                            <div className="flex-grow">
                                <p>New post in <strong>{notification.categorySlug.replace(/-/g, ' ')}</strong>: "{notification.postTitle}"</p>
                                <p className="text-sm text-muted-foreground">{notification.createdAt}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default function ProfilePage() {
  const { user, isLoading: isAuthLoading, signOutUser } = useAuth();
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchContent = async () => {
        setIsLoadingContent(true);
        const [posts, notifs] = await Promise.all([
            handleGetSavedPosts(user.uid),
            handleGetNotifications(user.uid)
        ]);
        setSavedPosts(posts);
        setNotifications(notifs);
        setIsLoadingContent(false);
      };
      fetchContent();
    } else if (!isAuthLoading) {
      // If auth is not loading and there's no user, stop loading content.
      setIsLoadingContent(false);
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
        <h1 className="text-4xl font-bold tracking-tighter font-headline">My Dashboard</h1>
        <p className="text-muted-foreground text-lg mt-2">{user.email}</p>
         <Button variant="link" onClick={signOutUser} className="mt-2 text-destructive">Sign Out</Button>
      </header>
      
      <main>
        <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="notifications" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="notifications">
                        <Bell className="mr-2 h-4 w-4" /> Notifications ({notifications.length})
                    </TabsTrigger>
                    <TabsTrigger value="saved-articles">
                        <Bookmark className="mr-2 h-4 w-4" /> Saved Articles ({savedPosts.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="notifications" className="mt-6">
                     {isLoadingContent ? (
                        <div className="text-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        </div>
                     ) : (
                        <NotificationsList notifications={notifications} />
                     )}
                </TabsContent>
                <TabsContent value="saved-articles" className="mt-6">
                    {isLoadingContent ? (
                        <div className="text-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        </div>
                    ) : (
                        <SavedPostsList posts={savedPosts} />
                    )}
                </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
