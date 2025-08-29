
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Shield, UserPlus } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllPosts } from "@/services/post-service";
import { teamMembers } from "@/lib/data";

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
        
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <div>
                    <CardTitle>Manage Team</CardTitle>
                    <CardDescription>
                        Add, edit, or remove team members from your About page.
                    </CardDescription>
                </div>
                 <Button>
                    <UserPlus className="mr-2"/>
                    Add Member
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <Card key={member.name} className="flex items-center gap-4 p-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </div>
                  <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      {member.name !== 'Favour Uduafemhe' && (
                        <Button variant="destructive" size="sm">Delete</Button>
                      )}
                  </div>
                </Card>
              ))}
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
