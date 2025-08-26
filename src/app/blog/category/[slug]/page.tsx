
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts, blogCategories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BlogCategoryPage({ params }: { params: { slug: string } }) {
  const category = blogCategories.find((c) => c.slug === params.slug);
  
  if (!category) {
    // We have a special page for betting predictions
    if (params.slug !== 'betting-predictions') {
        notFound();
    }
    // Let the betting predictions page handle itself. This is a bit of a workaround.
    // A better solution would be to merge the logic, but for now this works.
    return null;
  }

  const posts = blogPosts.filter((p) => p.category.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') === category.slug);

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
        <category.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">{category.name}</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Browse all articles in the "{category.name}" category.
        </p>
      </header>
      
      {posts.length > 0 ? (
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
        <p className="text-center text-muted-foreground">No posts found in this category yet.</p>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return blogCategories.map((category) => ({
    slug: category.slug,
  }));
}
