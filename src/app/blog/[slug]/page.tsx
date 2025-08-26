
'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, Loader2, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import { getSavesForPost, toggleSave } from '@/services/saves-service';
import type { Post } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// This is the Client Component that handles all interactivity.
function BlogPostContent({ post }: { post: Post }) {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [saves, setSaves] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoadingSaves, setIsLoadingSaves] = useState(true);
  const [isTogglingSave, setIsTogglingSave] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);


  useEffect(() => {
    if (!authLoading && post) {
      const fetchSaves = async () => {
        setIsLoadingSaves(true);
        try {
          const { count, isSaved } = await getSavesForPost(post.slug, user?.uid);
          setSaves(count);
          setIsSaved(isSaved);
        } catch (error) {
          console.error("Failed to fetch saves:", error);
        } finally {
          setIsLoadingSaves(false);
        }
      };
      fetchSaves();
    }
  }, [post, user, authLoading]);

  const handleSave = async () => {
    if (!user) {
        setShowAuthDialog(true);
        return;
    }
    
    if (isTogglingSave) return;

    setIsTogglingSave(true);
    try {
        const { count, isSaved: newIsSaved } = await toggleSave(post.slug, user.uid);
        setSaves(count);
        setIsSaved(newIsSaved);
    } catch (error) {
        console.error("Failed to toggle save:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not update your save. Please try again.",
        });
    } finally {
        setIsTogglingSave(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "The article URL has been copied to your clipboard.",
        });
    }
  };

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign in to save for later</AlertDialogTitle>
            <AlertDialogDescription>
              Create an account or sign in to save this article to your profile and read it anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push('/auth/register')}>Register</AlertDialogAction>
            <AlertDialogAction onClick={() => router.push('/auth/login')}>Sign In</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <article className="container max-w-4xl py-12 md:py-24">
        <header className="mb-8">
          <div className="text-center">
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
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-b py-4">
              <Button variant="ghost" size="sm" onClick={handleShare}><Share2 className="mr-2"/> Share</Button>
              <Button variant="ghost" size="sm" onClick={handleSave} disabled={isTogglingSave || isLoadingSaves}>
                {isTogglingSave ? <Loader2 className="mr-2 animate-spin"/> : <Bookmark className={`mr-2 ${isSaved ? 'fill-current' : ''}`}/>}
                {isSaved ? 'Saved' : 'Save'} ({saves})
              </Button>
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
            <li><strong>Following Hype Blindly:</strong> What works for one person might not work for you. Do your own research before jumping on a trend.</li>
          </ul>
          
          <p>By following these guidelines and committing to continuous learning, you're well on your way to achieving your goals. Explore our other articles to dive deeper into specific topics that interest you.</p>

           <div className="mt-12 text-sm p-4 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">
                <strong>Disclaimer:</strong> Some of the links in this article may be affiliate links, which means we may earn a small commission if you make a purchase at no additional cost to you. This helps support our work in bringing you valuable content.
            </p>
        </div>
        </div>

      </article>

      {relatedPosts.length > 0 && (
        <aside className="container max-w-4xl py-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center font-headline">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.slug} className="group flex flex-col">
                <Link href={`/blog/${relatedPost.slug}`} className="block">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    width={600}
                    height={400}
                    data-ai-hint={relatedPost.dataAiHint}
                    className="rounded-t-lg object-cover aspect-video"
                  />
                </Link>
                <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
                   <Badge variant="outline" className="w-fit">{relatedPost.category}</Badge>
                   <Link href={`/blog/${relatedPost.slug}`} className="block">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors flex-grow">{relatedPost.title}</h3>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </aside>
      )}
    </>
  );
}


// This is the main page component, which is a Server Component.
// It fetches the data and passes it to the Client Component.
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
