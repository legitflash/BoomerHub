
import { notFound } from 'next/navigation';
import { getTeamMemberBySlug } from '@/services/team-service';
import { getPostsByAuthorSlug } from '@/services/post-service';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Rss } from 'lucide-react';
import PostGrid from '@/components/blog/post-grid';

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const author = await getTeamMemberBySlug(params.slug);
  
  if (!author) {
    notFound();
  }
  
  const authorPosts = await getPostsByAuthorSlug(params.slug);

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

      <header className="mb-12 flex flex-col md:flex-row items-center gap-8">
        <Avatar className="h-32 w-32 border-4 border-primary">
            <AvatarImage src={author.image} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">{author.name}</h1>
            <p className="text-xl text-primary font-semibold mt-1">{author.role}</p>
            <p className="max-w-2xl mt-2 text-muted-foreground">
              {author.description}
            </p>
        </div>
      </header>

      <main>
        <h2 className="text-3xl font-bold tracking-tighter font-headline mb-8 flex items-center gap-3">
          <Rss /> Articles by {author.name}
        </h2>
        
        <PostGrid posts={authorPosts} />
      </main>
    </div>
  );
}
