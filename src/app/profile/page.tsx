
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { handleGetSavedPosts, handleGetNotifications, handleClearAllNotifications, handleUnsaveAllPosts } from '@/app/actions';
import type { Post, Notification } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, Bookmark, UserCircle, Bell, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const ITEMS_PER_PAGE = 9;

function SavedPostsList({ posts, onClearAll }: { posts: Post[], onClearAll: () => Promise<void> }) {
    const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
    const [showLoadMore, setShowLoadMore] = useState(false);
    
    useEffect(() => {
        setVisiblePosts(posts.slice(0, ITEMS_PER_PAGE));
        setShowLoadMore(posts.length > ITEMS_PER_PAGE);
    }, [posts]);

    const handleLoadMore = () => {
        const currentLength = visiblePosts.length;
        const nextPosts = posts.slice(currentLength, currentLength + ITEMS_PER_PAGE);
        setVisiblePosts([...visiblePosts, ...nextPosts]);
        if (currentLength + ITEMS_PER_PAGE >= posts.length) {
            setShowLoadMore(false);
        }
    };
    
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
        <div>
            <div className="flex justify-end mb-4">
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" disabled={posts.length === 0}>
                            <Trash2 className="mr-2 h-4 w-4" /> Unsave All
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently remove all of your saved articles.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onClearAll}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
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
            {showLoadMore && (
                <div className="mt-8 text-center">
                    <Button onClick={handleLoadMore}>Load More</Button>
                </div>
            )}
        </div>
    );
}

function NotificationsList({ notifications, onClearAll }: { notifications: Notification[], onClearAll: () => Promise<void> }) {
    const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);
    const [showLoadMore, setShowLoadMore] = useState(false);

    useEffect(() => {
        setVisibleNotifications(notifications.slice(0, ITEMS_PER_PAGE));
        setShowLoadMore(notifications.length > ITEMS_PER_PAGE);
    }, [notifications]);

    const handleLoadMore = () => {
        const currentLength = visibleNotifications.length;
        const nextNotifications = notifications.slice(currentLength, currentLength + ITEMS_PER_PAGE);
        setVisibleNotifications([...visibleNotifications, ...nextNotifications]);
        if (currentLength + ITEMS_PER_PAGE >= notifications.length) {
            setShowLoadMore(false);
        }
    };

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
        <div>
            <div className="flex justify-end mb-4">
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" disabled={notifications.length === 0}>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear All
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete all of your notifications.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onClearAll}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className="space-y-4">
                {visibleNotifications.map((notification) => (
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
            {showLoadMore && (
                <div className="mt-8 text-center">
                    <Button onClick={handleLoadMore}>Load More</Button>
                </div>
            )}
        </div>
    )
}

export default function ProfilePage() {
  const { user, isLoading: isAuthLoading, signOutUser } = useAuth();
  const { toast } = useToast();
  const [allSavedPosts, setAllSavedPosts] = useState<Post[]>([]);
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  const fetchContent = async () => {
    if (user) {
      setIsLoadingContent(true);
      const [posts, notifs] = await Promise.all([
          handleGetSavedPosts(user.uid),
          handleGetNotifications(user.uid)
      ]);
      setAllSavedPosts(posts);
      setAllNotifications(notifs);
      setIsLoadingContent(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchContent();
    } else if (!isAuthLoading) {
      setIsLoadingContent(false);
    }
  }, [user, isAuthLoading]);

  const handleClearNotifications = async () => {
    if (!user) return;
    const result = await handleClearAllNotifications(user.uid);
    if (result.success) {
      toast({ title: "Notifications Cleared", description: "All your notifications have been removed.", variant: "success" });
      fetchContent(); // Re-fetch to update the UI
    } else {
      toast({ title: "Error", description: "Could not clear notifications. Please try again.", variant: "destructive" });
    }
  };

  const handleClearSavedPosts = async () => {
    if (!user) return;
    const result = await handleUnsaveAllPosts(user.uid);
    if (result.success) {
      toast({ title: "Saved Articles Cleared", description: "All your saved articles have been removed.", variant: "success" });
      fetchContent(); // Re-fetch to update the UI
    } else {
      toast({ title: "Error", description: "Could not clear saved articles. Please try again.", variant: "destructive" });
    }
  };

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
                        <Bell className="mr-2 h-4 w-4" /> Notifications ({allNotifications.length})
                    </TabsTrigger>
                    <TabsTrigger value="saved-articles">
                        <Bookmark className="mr-2 h-4 w-4" /> Saved Articles ({allSavedPosts.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="notifications" className="mt-6">
                     {isLoadingContent ? (
                        <div className="text-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        </div>
                     ) : (
                        <NotificationsList notifications={allNotifications} onClearAll={handleClearNotifications} />
                     )}
                </TabsContent>
                <TabsContent value="saved-articles" className="mt-6">
                    {isLoadingContent ? (
                        <div className="text-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        </div>
                    ) : (
                        <SavedPostsList posts={allSavedPosts} onClearAll={handleClearSavedPosts}/>
                    )}
                </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
