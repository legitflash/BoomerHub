
import { notFound } from 'next/navigation';
import { getTeamMemberBySlug } from '@/services/team-service';
import { getPostsByAuthorSlug } from '@/services/post-service';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Rss } from 'lucide-react';

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
        
        {authorPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {authorPosts.map((post) => (
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
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No articles found for this author yet.</p>
        )}
      </main>
    </div>
  );
}
