import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Shield } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/services/post-service";

export default async function AdminPage() {
  const posts = await getAllPosts();

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
        <Button asChild>
            <Link href="/admin/create-post">
                <PlusCircle className="mr-2"/>
                Create New Post
            </Link>
        </Button>
      </header>

      <div className="max-w-5xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Manage Posts</CardTitle>
                <CardDescription>
                    Here you can view, edit, and delete your existing blog posts.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {posts.map((post) => (
                <Card key={post.slug} className="flex flex-col sm:flex-row items-center gap-4 p-4">
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
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </Card>
              ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
