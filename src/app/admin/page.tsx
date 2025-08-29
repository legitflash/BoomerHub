
'use client';

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Shield, UserPlus, Trophy, Folder, FilePlus, Inbox, Loader2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from 'react';

import { getAllPosts, type Post } from "@/services/post-service";
import { getAllTeamMembers, type TeamMember } from "@/services/team-service";
import { getAllPredictions, type Prediction } from "@/services/prediction-service";
import { getAllCategories, type BlogCategory } from "@/services/category-service";
import { getAllPages, type Page } from "@/services/page-service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { handleDeleteTeamMember, handleDeletePost, handleDeleteCategory, handleDeletePrediction, handleDeletePage } from "../actions";
import { useAuth } from "@/hooks/use-auth";


export default function AdminPage() {
  const { isAdmin, isEditor, isLoading: isAuthLoading } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    async function fetchData() {
        setIsLoadingData(true);
        const [
            postsData, 
            teamMembersData, 
            predictionsData, 
            categoriesData, 
            pagesData
        ] = await Promise.all([
            getAllPosts(),
            getAllTeamMembers(),
            getAllPredictions(),
            getAllCategories(),
            getAllPages()
        ]);
        setPosts(postsData);
        setTeamMembers(teamMembersData);
        setPredictions(predictionsData);
        setCategories(categoriesData);
        setPages(pagesData);
        setIsLoadingData(false);
    }
    
    if (!isAuthLoading) {
        fetchData();
    }
  }, [isAuthLoading]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Won':
        return 'success';
      case 'Lost':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (isAuthLoading || isLoadingData) {
      return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
  }

  // Admin gets full access, Editor gets only post management
  if (isAdmin) {
    return (
      <div className="container py-12 md:py-16">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline flex items-center gap-2">
              <Shield className="h-10 w-10 text-primary" />
              Admin Panel
            </h1>
            <p className="max-w-2xl mt-2 text-muted-foreground md:text-xl">
              Manage your blog posts and site content.
            </p>
          </div>
        </header>

        <div className="max-w-5xl mx-auto space-y-8">
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle className="flex items-center gap-2"><Inbox/> Submissions</CardTitle>
                        <CardDescription>
                            Review messages from your contact forms.
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/admin/notifications">
                            View Submissions
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground text-center py-4">All form submissions are available on the notifications page.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Manage Posts</CardTitle>
                        <CardDescription>
                            Here you can view, edit, and delete your existing blog posts.
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/admin/create-post">
                            <PlusCircle className="mr-2"/>
                            Create New Post
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                {posts.map((post) => (
                    <Card key={post.id} className="flex flex-col sm:flex-row items-center gap-4 p-4">
                    <Image 
                        src={post.image} 
                        alt={post.title}
                        width={150}
                        height={100}
                        className="rounded-md object-cover aspect-video"
                    />
                    <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                        <Badge variant="outline">{post.category}</Badge>
                        <span>&middot;</span>
                        <span>{post.author}</span>
                        <span>&middot;</span>
                        <span>{post.date}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/edit-post/${post.id}`}>Edit</Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form action={handleDeletePost}>
                                    <input type="hidden" name="id" value={post.id} />
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this post.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="mt-4">
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction type="submit">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    </Card>
                ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Manage Pages</CardTitle>
                        <CardDescription>
                            Create and manage standalone pages.
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/admin/create-page">
                            <FilePlus className="mr-2"/>
                            Create Page
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                {pages.length > 0 ? (
                    <div className="space-y-4">
                    {pages.map((page) => (
                        <Card key={page.id} className="flex items-center gap-4 p-4">
                        <div className="flex-grow">
                            <h3 className="font-semibold text-lg">{page.title}</h3>
                            <p className="text-sm text-muted-foreground">/{page.slug} &middot; Created on {String(page.createdAt)}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/${page.slug}`} target="_blank">View</Link>
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">Delete</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <form action={handleDeletePage}>
                                        <input type="hidden" name="id" value={page.id} />
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete this page.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className="mt-4">
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction type="submit">Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </form>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        </Card>
                    ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-4">No custom pages have been created yet.</p>
                )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Manage Predictions</CardTitle>
                        <CardDescription>
                            Add, edit, or remove sports predictions.
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/admin/create-prediction">
                            <Trophy className="mr-2"/>
                            Add Prediction
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                {predictions.map((p) => (
                    <Card key={p.id} className="flex flex-col sm:flex-row items-start gap-4 p-4">
                    <div className="flex-grow space-y-2">
                        <h3 className="font-semibold text-lg">{p.match}</h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                        <Badge variant="outline">{p.league}</Badge>
                        <span>&middot;</span>
                        <span>{p.prediction}</span>
                        <span>&middot;</span>
                        <span>Odds: {p.odds}</span>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                            <Badge variant={getStatusBadgeVariant(p.status) as any}>{p.status}</Badge>
                            <Badge variant="secondary">{p.confidence} confidence</Badge>
                            {p.isHot && <Badge variant="destructive">Hot Tip</Badge>}
                        </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                         <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/edit-prediction/${p.id}`}>Edit</Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form action={handleDeletePrediction}>
                                    <input type="hidden" name="id" value={p.id} />
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this prediction.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="mt-4">
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction type="submit">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    </Card>
                ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Manage Categories</CardTitle>
                        <CardDescription>
                            Create, edit, or delete blog post categories.
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/admin/create-category">
                            <Folder className="mr-2"/>
                            Create Category
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                {categories.map((category) => (
                    <Card key={category.id} className="flex items-center gap-4 p-4">
                    <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">Slug: {category.slug}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/edit-category/${category.id}`}>Edit</Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form action={handleDeleteCategory}>
                                    <input type="hidden" name="id" value={category.id} />
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this category.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="mt-4">
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction type="submit">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    </Card>
                ))}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Manage Team</CardTitle>
                        <CardDescription>
                            Add, edit, or remove team members from your About page.
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/admin/add-member">
                            <UserPlus className="mr-2"/>
                            Add Member
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                {teamMembers.map((member) => (
                    <Card key={member.id} className="flex items-center gap-4 p-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-primary">{member.role}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/edit-member/${member.id}`}>Edit</Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form action={handleDeleteTeamMember}>
                                    <input type="hidden" name="id" value={member.id} />
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the team member from your site.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="mt-4">
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction type="submit">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    </Card>
                ))}
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  if (isEditor) {
    return (
        <div className="container py-12 md:py-16">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div className="text-center sm:text-left">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline flex items-center gap-2">
                <Shield className="h-10 w-10 text-primary" />
                Editor Dashboard
                </h1>
                <p className="max-w-2xl mt-2 text-muted-foreground md:text-xl">
                    Manage your assigned blog posts.
                </p>
            </div>
            </header>

            <div className="max-w-5xl mx-auto space-y-8">
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Manage Posts</CardTitle>
                        <CardDescription>
                            Here you can view, edit, and delete your existing blog posts.
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/admin/create-post">
                            <PlusCircle className="mr-2"/>
                            Create New Post
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                {posts.map((post) => (
                    <Card key={post.id} className="flex flex-col sm:flex-row items-center gap-4 p-4">
                    <Image 
                        src={post.image} 
                        alt={post.title}
                        width={150}
                        height={100}
                        className="rounded-md object-cover aspect-video"
                    />
                    <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                        <Badge variant="outline">{post.category}</Badge>
                        <span>&middot;</span>
                        <span>{post.author}</span>
                        <span>&middot;</span>
                        <span>{post.date}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/edit-post/${post.id}`}>Edit</Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form action={handleDeletePost}>
                                    <input type="hidden" name="id" value={post.id} />
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this post.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="mt-4">
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction type="submit">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    </Card>
                ))}
                </CardContent>
            </Card>
            </div>
        </div>
    );
  }
  
  // Fallback for when the user has access but isn't an admin or editor
  // This case should ideally be handled by the layout redirecting.
  return (
     <div className="container py-12 md:py-16">
        <p>You do not have permission to view this content.</p>
    </div>
  );
}
