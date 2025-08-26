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
        
        <p>The world of online opportunities is vast and ever-expanding. Whether you're looking to make a little extra cash on the side or build a full-fledged online empire, the right knowledge and tools can make all the difference. This article is your starting point for one of the many paths you can take.</p>
        
        <h2>Understanding the Fundamentals</h2>
        <p>Before diving in, it's crucial to understand the core concepts. For instance, in forex trading, this means grasping what currency pairs are and how they are traded. If you're exploring social media, it's about understanding your target audience and the platform's algorithm. We'll break down these essentials in a clear, easy-to-digest manner.</p>
        
        <Image src="https://picsum.photos/800/450" alt="Fundamentals" width={800} height={450} data-ai-hint="planning board" className="rounded-md" />

        <h2>Step-by-Step Guide</h2>
        <p>Let's get practical. Here’s a general roadmap to get you started:</p>
        <ol>
          <li><strong>Research and Learn:</strong> Dedicate time to learn the basics. Read blogs, watch tutorials, and consider taking a foundational course.</li>
          <li><strong>Set Up Your Tools:</strong> This could be opening a brokerage account, creating a social media business profile, or signing up for a no-code app builder.</li>
          <li><strong>Start Small:</strong> Don't risk a large amount of capital or time initially. Start with a small project or investment to test the waters.</li>
          <li><strong>Analyze and Adapt:</strong> Review your results. What's working? What isn't? Adjust your strategy based on data, not emotion.</li>
          <li><strong>Scale Up:</strong> Once you have a proven strategy that yields positive results, you can begin to scale your efforts.</li>
        </ol>

        <h2>Common Pitfalls to Avoid</h2>
        <p>Many beginners make similar mistakes. Being aware of them can save you time and money.</p>
        <ul>
          <li><strong>Lack of Patience:</strong> Success rarely happens overnight. Be prepared for a journey of consistent effort.</li>
          <li><strong>Ignoring Risk Management:</strong> In any venture involving money, understanding and managing risk is paramount.</li>
          - <strong>Following Hype Blindly:</strong> What works for one person might not work for you. Do your own research before jumping on a trend.</li>
        </ul>
        
        <p>By following these guidelines and committing to continuous learning, you're well on your way to achieving your goals. Explore our other articles and courses to dive deeper into specific topics that interest you.</p>
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
