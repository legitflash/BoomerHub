
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, Loader2, Globe, Download, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Post, Advertisement } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { translateText } from '@/ai/flows/translate-text';
import { useAuth } from '@/hooks/use-auth';
import { getSavesForPost } from '@/services/saves-service';
import { handleToggleSavePost } from '@/app/actions';
import { getActiveAdvertisementsByPlacement } from '@/services/ad-service';

const getPostContentAsText = (element: HTMLElement | null) => {
    return element?.textContent || '';
}

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


const AdBanner = ({ ad }: { ad: Advertisement }) => {
    return (
        <div 
            className="my-8 p-4 border rounded-lg bg-muted/20 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: ad.content }}
        />
    );
};

export default function BlogPostContent({ post, relatedPosts }: { post: Post, relatedPosts: Post[] }) {
  const { toast } = useToast();
  const { user } = useAuth();
  const articleRef = useRef<HTMLDivElement>(null);
  
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const originalContentRef = useRef<string | null>(null);

  const [isSaved, setIsSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const [adBefore, setAdBefore] = useState<Advertisement | null>(null);
  const [adAfter, setAdAfter] = useState<Advertisement | null>(null);

  useEffect(() => {
    const fetchSaveStatus = async () => {
      const { count, isSaved: userHasSaved } = await getSavesForPost(post.slug, user?.uid);
      setSaveCount(count);
      setIsSaved(userHasSaved);
    };

    const fetchAds = async () => {
        const [beforeAds, afterAds] = await Promise.all([
            getActiveAdvertisementsByPlacement('before-post-content'),
            getActiveAdvertisementsByPlacement('after-post-content')
        ]);
        // Display one random ad for each placement if available
        if (beforeAds.length > 0) setAdBefore(beforeAds[Math.floor(Math.random() * beforeAds.length)]);
        if (afterAds.length > 0) setAdAfter(afterAds[Math.floor(Math.random() * afterAds.length)]);
    };

    fetchSaveStatus();
    fetchAds();
  }, [post.slug, user]);

  const toggleSave = async () => {
    if (!user) {
        toast({
            title: "Login Required",
            description: "You must be logged in to save posts.",
            variant: "destructive",
        });
        return;
    }
    setIsSaving(true);
    try {
        const result = await handleToggleSavePost(post.slug, user.uid);
        setIsSaved(result.isSaved);
        setSaveCount(prev => result.isSaved ? prev + 1 : prev - 1);
        toast({
            title: result.isSaved ? "Post Saved!" : "Post Unsaved",
            description: result.isSaved ? "This article has been added to your profile." : "This article has been removed from your profile.",
            variant: "success",
        });
    } catch (error) {
        toast({
            title: "Error",
            description: "Could not update save status. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsSaving(false);
    }
  };
  
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
        console.error('Error sharing:', error);
        fallbackCopyLink();
      }
    } else {
      fallbackCopyLink();
    }
  };
  
  const handleDownload = async () => {
    try {
        const response = await fetch(post.image);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${post.slug}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading image:', error);
        toast({
            variant: "destructive",
            title: "Download failed",
            description: "Could not download the image. Please try again.",
        });
    }
  };

  const handleTranslate = async (language: string) => {
    if (isTranslating) return;

    setIsTranslating(true);
    if (originalContentRef.current === null && articleRef.current) {
        originalContentRef.current = getPostContentAsText(articleRef.current);
    }
    
    if (!originalContentRef.current) {
         toast({
            variant: "destructive",
            title: "Translation Failed",
            description: "Could not read the article content.",
        });
        setIsTranslating(false);
        return;
    }

    try {
        const result = await translateText({ text: originalContentRef.current, targetLanguage: language });
        setTranslatedContent(result.translatedText);
    } catch (error) {
        console.error("Translation failed:", error);
        toast({
            variant: "destructive",
            title: "Translation Failed",
            description: "Could not translate the article. Please try again.",
        });
    } finally {
        setIsTranslating(false);
    }
  }

  const showOriginalContent = () => {
      setTranslatedContent(null);
  }
    
  const articleBody = (
     <div ref={articleRef} className="prose prose-lg dark:prose-invert max-w-none mx-auto" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
  )

  return (
    <>
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
          <div className="mt-6 flex items-center justify-center flex-wrap gap-2 border-t border-b py-4">
              <Button variant="ghost" size="sm" onClick={toggleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 animate-spin"/> : <Bookmark className={`mr-2 ${isSaved ? 'fill-primary' : ''}`} />}
                {isSaved ? 'Saved' : 'Save'} ({saveCount})
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}><Share2 className="mr-2"/> Share</Button>
              <Button variant="ghost" size="sm" onClick={handleDownload}><Download className="mr-2"/> Download Image</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" disabled={isTranslating}>
                        {isTranslating ? <Loader2 className="mr-2 animate-spin" /> : <Globe className="mr-2" />}
                        Translate
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleTranslate('Spanish')}>Spanish</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTranslate('French')}>French</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTranslate('German')}>German</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTranslate('Japanese')}>Japanese</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

        {adBefore && <AdBanner ad={adBefore} />}

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
          {isTranslating && (
             <div className="text-center p-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-muted-foreground">Translating article...</p>
             </div>
          )}

          {!isTranslating && translatedContent && (
             <div>
                <Button variant="outline" onClick={showOriginalContent} className='mb-4'>Show Original</Button>
                <div className="whitespace-pre-wrap">{translatedContent}</div>
             </div>
          )}
          
          {!isTranslating && !translatedContent && articleBody}

        </div>
        
        {adAfter && <AdBanner ad={adAfter} />}

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
