
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { urlFor } from '@/lib/sanity-client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, ArrowRight, Twitter, Facebook, Linkedin, Mail, MessageCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Post } from '@/lib/types';
import CategoryActionBanner from './category-action-banner';
import AdsterraBanner from '../ads/adsterra-banner';
import CodeBlock from './code-block';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import PostGrid from './post-grid';

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

const ImageComponent = ({ value }: { value: any }) => {
    if (!value || !value.asset) {
        return null;
    }
    
    return (
        <figure className="my-8 not-prose">
            <Image
                src={urlFor(value).width(800).height(600).url()}
                alt={value.alt || 'Blog post image'}
                width={800}
                height={600}
                className="rounded-lg object-cover w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 800px"
            />
            {value.caption && (
                <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {value.caption}
                </figcaption>
            )}
        </figure>
    );
};

const portableTextComponents = {
  types: {
    cta: CtaComponent,
    code: CodeBlock,
    image: ImageComponent,
  },
  marks: {
    textColor: ({ children, value }: { children: React.ReactNode; value: { color: string } }) => (
      <span style={{ color: value.color }}>{children}</span>
    ),
    backgroundColor: ({ children, value }: { children: React.ReactNode; value: { color: string } }) => (
      <span style={{ backgroundColor: value.color, padding: '2px 4px', borderRadius: '4px' }}>{children}</span>
    ),
    fontSize: ({ children, value }: { children: React.ReactNode; value: { size: string } }) => (
      <span className={value.size}>{children}</span>
    ),
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => (
      <Link href={value.href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
  },
};


export default function BlogPostContent({ post, allPosts }: { post: Post, allPosts: Post[] }) {
  const { toast } = useToast();
  const [postUrl, setPostUrl] = useState('');

  // Use the reliable categorySlug for filtering related posts
  const relatedPosts = allPosts
    .filter((p) => p.categorySlug === post.categorySlug && p.slug !== post.slug)
    .slice(0, 5); // Show up to 5 related posts as requested

  useEffect(() => {
    // Ensure this runs only on the client
    setPostUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    toast({
      title: "Link Copied",
      description: "The article URL has been copied to your clipboard.",
    });
  };

  const shareActions = [
    { name: 'Copy Link', icon: Copy, action: handleCopyLink },
    { name: 'Twitter', icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}` },
    { name: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}` },
    { name: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description)}` },
    { name: 'WhatsApp', icon: MessageCircle, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + postUrl)}` },
    { name: 'Email', icon: Mail, href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.description + '\n\nRead more at: ' + postUrl)}` },
  ];
    
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
                      <span>{post.author}</span>
                  </div>
                  <span>&middot;</span>
                  <span>{post.date}</span>
              </div>
          </div>
          <div className="mt-6 flex items-center justify-center flex-wrap gap-2 border-t border-b py-4">
              <TooltipProvider>
                {shareActions.map(({ name, icon: Icon, action, href }) => (
                  <Tooltip key={name}>
                    <TooltipTrigger asChild>
                      {action ? (
                        <Button variant="ghost" size="icon" onClick={action}>
                          <Icon className="h-5 w-5" />
                          <span className="sr-only">{`Share on ${name}`}</span>
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={href} target="_blank" rel="noopener noreferrer">
                            <Icon className="h-5 w-5" />
                            <span className="sr-only">{`Share on ${name}`}</span>
                          </a>
                        </Button>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
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

        <AdsterraBanner />
        
        <div className="mt-8">
            {articleBody}
        </div>

        <div className="mt-12 border-t pt-8">
            <h3 className="text-lg font-semibold mb-4">READ MORE</h3>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" asChild>
                    <Link href={`/blog/category/${post.categorySlug}`}>
                        {post.category}
                    </Link>
                </Button>
            </div>
        </div>

      </article>

      <div className="container max-w-4xl">
        <CategoryActionBanner category={post.category} />
      </div>

      {(relatedPosts.length > 0) && (
        <aside className="container max-w-4xl py-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center font-headline">Related Articles</h2>
          <PostGrid posts={relatedPosts} includeAd={true} />
        </aside>
      )}
    </>
  );
}
