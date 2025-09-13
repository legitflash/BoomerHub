
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { adLinks } from '@/lib/data';
import placeholderImageData from '@/lib/placeholder-images.json';

const adCreatives = placeholderImageData.ads;

interface AdCreative {
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  dataAiHint: string;
}


export default function SearchAdCard() {
  const [ad, setAd] = useState<AdCreative | null>(null);
  const [adUrl, setAdUrl] = useState<string>('');
  
  useEffect(() => {
    // This runs only on the client, after hydration, to prevent mismatch
    const randomAd = adCreatives[Math.floor(Math.random() * adCreatives.length)];
    const randomLink = adLinks[Math.floor(Math.random() * adLinks.length)];
    setAd(randomAd);
    setAdUrl(randomLink);
  }, []);

  if (!ad || !adUrl) {
    // Show a skeleton loader while the ad is being selected on the client
    return (
        <Card>
            <Skeleton className="w-full h-[214px] rounded-t-lg" />
            <CardContent className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-5/6" />
            </CardContent>
        </Card>
    );
  }
  
  return (
    <Card className="group flex flex-col">
      <Link href={adUrl} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative">
            <Image
                src={ad.image}
                alt={ad.alt}
                width={ad.width}
                height={ad.height}
                data-ai-hint={ad.dataAiHint}
                className="w-full rounded-t-lg object-cover aspect-video"
            />
            <Badge variant="destructive" className="absolute top-2 right-2">Ad</Badge>
        </div>
      </Link>
      <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
        <Link href={adUrl} target="_blank" rel="noopener noreferrer" className="block">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors flex-grow">
            {ad.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {ad.description}
        </p>
      </CardContent>
    </Card>
  );
}
