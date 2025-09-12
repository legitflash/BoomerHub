
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Post } from '@/lib/types';
import CategoryActionBanner from './category-action-banner';
import AdsterraBanner from '../ads/adsterra-banner';
import SearchAdCard from '../ads/search-ad-card';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

const CtaComponent = ({ value }: { value: any }) => {
    if (!value || !value.url || !value.buttonText) {
        return null;
    }
    return (
        <div className="my-8 rounded-lg bg-primary/10 p-6 text-center not-prose">
            <h3 className="text-xl font-bold font-headline mb-2">{value.title}</h3>
            <p className="text-muted-foreground mb-4">{value.description}</p>
            <Button asChild>
                <Link href={value.url} target="_blank" rel="noopener noreferrer">
                    {value.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    );
};

const portableTextComponents = {
  types: {
    cta: CtaComponent,
  },
};


export default function BlogPostContent({ post, relatedPosts }: { post: Post, relatedPosts: Post[] }) {
  const { toast } = useToast();
  
  const fallbackCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "The article URL has been copied to your clipboard.",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `${post.description}`,
          url: window.location.href,
        });
      } catch (error: any) {
        // If the user cancels the share dialog, do nothing.
        if (error.name === 'AbortError') {
          return;
        }
        console.error('Error sharing, using fallback:', error);
        fallbackCopyLink();
      }
    } else {
      fallbackCopyLink();
    }
  };
    
  const articleBody = (
     <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <PortableText value={post.content} components={portableTextComponents} />
     </div>
  )

  return (
    <>
      <article className="container max-w-4xl py-12 md:py-24">
        <header className="mb-8">
          <div className="text-center">
              <Link href={`/blog/category/${post.categorySlug}`} className="inline-block">
                <Badge variant="outline" className="mb-4">{post.category}</Badge>
              </Link>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-4">{post.title}</h1>
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                      <AvatarImage src={post.authorImage} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Link href={`/author/${post.authorSlug}`} className="hover:underline">{post.author}</Link>
                  </div>
                  <span>&middot;</span>
                  <span>{post.date}</span>
              </div>
          </div>
          <div className="mt-6 flex items-center justify-center flex-wrap gap-2 border-t border-b py-4">
              <Button variant="ghost" size="sm" onClick={handleShare}><Share2 className="mr-2"/> Share</Button>
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
          crossOrigin="anonymous" 
        />

        <AdsterraBanner />
        
        <div className="mt-8">
            {articleBody}
        </div>

        <div className="mt-12 border-t pt-8">
            <h3 className="text-lg font-semibold mb-4">READ MORE</h3>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" asChild>
                    <Link href={`/blog/category/${slugify(post.category)}`}>
                        {post.category}
                    </Link>
                </Button>
            </div>
        </div>

      </article>

      <div className="container max-w-4xl">
        <CategoryActionBanner category={post.category} />
      </div>

      {relatedPosts.length > 0 && (
        <aside className="container max-w-4xl py-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center font-headline">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 2).map((relatedPost) => (
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
             <SearchAdCard />
            {relatedPosts.slice(2).map((relatedPost) => (
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
