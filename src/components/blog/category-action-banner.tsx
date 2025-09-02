
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, DollarSign, Megaphone, BrainCircuit, Briefcase } from 'lucide-react';
import { Badge } from '../ui/badge';

interface BannerDetails {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  bgColor: string;
  textColor: string;
}

const adUrl = "https://coldquit.com/b.3CVp0NPX3Np/v_bEmJV_JiZSD/0r2EN/juMl1YMUDmcE5/LMTpYK2rM/zkUUw/OxDsAG";

const bannerConfig: { [key: string]: BannerDetails } = {
  'Finance': {
    icon: DollarSign,
    title: "Make Money Online",
    description: "Up to $100 daily.",
    buttonText: "Start Earning",
    href: adUrl,
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white"
  },
  'Social Media': {
    icon: Megaphone,
    title: "Make Money Online",
    description: "Up to $100 daily.",
    buttonText: "Start Earning",
    href: adUrl,
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white"
  },
  'AI/Tech': {
    icon: BrainCircuit,
    title: "Make Money Online",
    description: "Up to $100 daily.",
    buttonText: "Start Earning",
    href: adUrl,
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white"
  },
  'Freelancing': {
    icon: Briefcase,
    title: "Make Money Online",
    description: "Up to $100 daily.",
    buttonText: "Start Earning",
    href: adUrl,
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white"
  },
  'default': {
    icon: DollarSign,
    title: "Make Money Online",
    description: "Up to $100 daily.",
    buttonText: "Start Earning",
    href: adUrl,
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white"
  }
};

const CategoryActionBanner = ({ category }: { category: string }) => {
  
  const details = bannerConfig[category] || bannerConfig.default;
  const { icon: Icon, title, description, buttonText, href, bgColor, textColor } = details;

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
                    <Link href={href}>{buttonText} <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
};

export default CategoryActionBanner;
