
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, DollarSign, Megaphone, BrainCircuit, Briefcase } from 'lucide-react';

interface BannerDetails {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  bgColor: string;
  textColor: string;
}

const bannerConfig: { [key: string]: BannerDetails } = {
  'Finance': {
    icon: DollarSign,
    title: "Unlock Your Earning Potential!",
    description: "Discover exclusive strategies and platforms to boost your income. Start your journey to financial freedom today.",
    buttonText: "Get $100 Finance Course",
    href: "#", // Replace with your Monetag link
    bgColor: "bg-blue-600",
    textColor: "text-white"
  },
  'Social Media': {
    icon: Megaphone,
    title: "Go Viral, Get Paid",
    description: "Learn the secrets to monetizing your social media presence. Turn your followers into revenue.",
    buttonText: "Monetization Secrets",
    href: "#", // Replace with your Monetag link
    bgColor: "bg-rose-500",
    textColor: "text-white"
  },
  'AI/Tech': {
    icon: BrainCircuit,
    title: "Step into the Future with AI",
    description: "Access cutting-edge AI tools that can revolutionize your workflow and creativity.",
    buttonText: "Explore AI Tools",
    href: "#", // Replace with your Monetag link
    bgColor: "bg-indigo-600",
    textColor: "text-white"
  },
  'Freelancing': {
    icon: Briefcase,
    title: "Your Freelance Career Starts Here",
    description: "Find high-paying gigs and learn the skills you need to succeed as a freelancer.",
    buttonText: "Find Freelance Jobs",
    href: "#", // Replace with your Monetag link
    bgColor: "bg-green-600",
    textColor: "text-white"
  },
  'default': {
    icon: ArrowRight,
    title: "Continue Your Learning Journey",
    description: "Explore our full range of courses and tools to accelerate your growth.",
    buttonText: "Discover More",
    href: "/blog",
    bgColor: "bg-secondary",
    textColor: "text-secondary-foreground"
  }
};

const CategoryActionBanner = ({ category }: { category: string }) => {
  const details = bannerConfig[category] || bannerConfig.default;
  const { icon: Icon, title, description, buttonText, href, bgColor, textColor } = details;

  return (
    <div className="my-12">
        <Card className={`${bgColor} ${textColor} overflow-hidden`}>
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
