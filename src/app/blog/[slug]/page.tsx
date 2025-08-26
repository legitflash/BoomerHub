import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, courses } from '@/lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  const relatedCourse = courses[0]; // Placeholder for related course logic

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-4xl py-12 md:py-24">
      <header className="mb-8 text-center">
        <Badge variant="outline" className="mb-4">{post.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-4">{post.title}</h1>
        <div className="flex items-center justify-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.authorImage} alt={post.author} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
          </div>
          <span>&middot;</span>
          <span>{post.date}</span>
        </div>
      </header>

      <Image
        src={post.image}
        alt={post.title}
        width={1200}
        height={600}
        data-ai-hint={post.dataAiHint}
        className="rounded-lg object-cover aspect-video mb-8"
        priority
      />

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <p className="lead">{post.description}</p>
        <p>This is a step-by-step guide. In a real application, this section would contain the full blog post content, including formatted text, images, and embedded videos.</p>
        <p>For now, please imagine detailed instructions and helpful visuals filling this space, guiding you through the topic at hand.</p>
        
        <h3>Step 1: The Beginning</h3>
        <p>Every great journey starts with a single step. Here, we would lay the groundwork for what's to come.</p>
        <Image src="https://picsum.photos/800/450" alt="Step 1" width={800} height={450} data-ai-hint="planning board" className="rounded-md" />

        <h3>Step 2: The Middle Part</h3>
        <p>This is where the magic happens. We would dive deep into the core concepts, with practical examples and tips.</p>

        <h3>Step 3: The Conclusion</h3>
        <p>Finally, we would wrap everything up, providing a summary and suggesting next steps for continued learning.</p>
      </div>
      
      {relatedCourse && (
        <Card className="mt-16 bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle>Want to become a certified expert?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Enroll in our "{relatedCourse.title}" course for a deep dive, practical projects, and an official certification.</p>
            <Button asChild>
              <Link href={`/courses/${relatedCourse.slug}`}>
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
