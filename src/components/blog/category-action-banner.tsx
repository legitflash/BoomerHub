
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, DollarSign, Megaphone, BrainCircuit, Briefcase, Loader2 } from 'lucide-react';
import { Badge } from '../ui/badge';

interface BannerDetails {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  bgColor: string;
  textColor: string;
}

const adLinks = [
  "https://otieu.com/4/9697212", // Monetag
  "https://chickenadjacent.com/ebjb0w2rm?key=7bf3c280c5f98c617913935e30c2fb3c" // Adsterra Smart Link
]; 

const bannerConfig: { [key: string]: Omit<BannerDetails, 'href'> } = {
  'Finance': {
    icon: DollarSign,
    title: "Make Money Online",
    description: "Up to $100 daily.",
    buttonText: "Start Earning",
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white"
  },
  'Social Media': {
    icon: Megaphone,
    title: "Make Money Online",
    description: "Up to $100 daily.",
    buttonText: "Start Earning",
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white"
  },
  'AI/Tech': {
    icon: BrainCircuit,
    title: "Make Money Online",
    description: "Up to $100 daily.",
    buttonText: "Start Earning",
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white"
  },
  'Freelancing': {
    icon: Briefcase,
    title: "Make Money Online",
    description: "Up to $100 daily.",
    buttonText: "Start Earning",
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white"
  },
  'default': {
    icon: DollarSign,
    title: "Make Money Online",
    description: "Up to $100 daily.",
    buttonText: "Start Earning",
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white"
  }
};

const CategoryActionBanner = ({ category }: { category: string }) => {
  const [adUrl, setAdUrl] = useState<string>('');

  useEffect(() => {
    // Randomly select an ad link on the client side to prevent hydration mismatch
    const randomLink = adLinks[Math.floor(Math.random() * adLinks.length)];
    setAdUrl(randomLink);
  }, []);
  
  const details = bannerConfig[category] || bannerConfig.default;
  const { icon: Icon, title, description, buttonText, bgColor, textColor } = details;

  if (!adUrl) {
    return (
        <div className="my-12">
            <Card className="bg-muted overflow-hidden relative animate-pulse">
                 <CardContent className="p-8 h-[150px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-muted-foreground" />
                 </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="my-12">
        <Card className={`${bgColor} ${textColor} overflow-hidden relative`}>
            <Badge variant="secondary" className="absolute top-2 right-2 opacity-80">Ad</Badge>
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="flex-shrink-0">
                    <div className="border-4 border-white/50 rounded-full p-4">
                    <Icon className="h-12 w-12" />
                    </div>
                </div>
                <div className="flex-grow">
                    <h3 className="text-2xl font-bold font-headline">{title}</h3>
                    <p className="mt-1 opacity-90 max-w-xl">{description}</p>
                </div>
                <div className="flex-shrink-0">
                    <Button 
                        asChild 
                        size="lg" 
                        variant="secondary" 
                        className="bg-white/90 text-black hover:bg-white"
                    >
                    <Link href={adUrl} target="_blank" rel="noopener noreferrer">{buttonText} <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
};

export default CategoryActionBanner;
