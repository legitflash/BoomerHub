
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, GraduationCap, ChevronDown, Bot, Moon, Sun } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { aiToolsCategories } from '@/lib/data';
import { useState, useEffect } from 'react';
import { getAllCategories } from '@/services/category-service';
import type { BlogCategory } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

export function Header() {
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategories();
      setBlogCategories(categories);
    }
    fetchCategories();
  }, []);

  
  const handleAIClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    router.push(slug);
  };
  
  const uniqueCategories = blogCategories.filter(
    (category, index, self) =>
      index === self.findIndex((c) => c.slug === category.slug)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Left Side: Mobile Menu */}
        <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <SheetHeader>
                    <SheetTitle>
                        <VisuallyHidden>Navigation Menu</VisuallyHidden>
                    </SheetTitle>
                </SheetHeader>
                <Link href="/" className="mr-6 flex items-center space-x-2 p-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="font-bold">BoomerHub</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="home" className="border-b-0">
                        <Link href="/" className="text-foreground font-semibold py-4 w-full block">Home</Link>
                    </AccordionItem>
                    <AccordionItem value="blog" className="border-b-0">
                      <AccordionTrigger>Blog</AccordionTrigger>
                      <AccordionContent className="flex flex-col space-y-2 pl-4">
                          {uniqueCategories.map((category) => (
                          <Link key={category.slug} href={`/blog/category/${category.slug}`}>{category.name}</Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="ai-tools" className="border-b-0">
                      <AccordionTrigger className="flex items-center gap-2"><Bot className="h-4 w-4" /> Boomerhub AI</AccordionTrigger>
                      <AccordionContent className="flex flex-col space-y-2 pl-4">
                          {aiToolsCategories.map((tool) => (
                            <Link key={tool.slug} href={tool.slug} onClick={(e) => handleAIClick(e, tool.slug)} className="flex items-center gap-2">
                            <tool.icon className="h-4 w-4" />
                            {tool.name}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="about" className="border-b-0">
                        <Link href="/about" className="text-foreground py-4 w-full block">About</Link>
                    </AccordionItem>
                    <AccordionItem value="contact" className="border-b-0">
                        <Link href="/contact" className="text-foreground py-4 w-full block">Contact</Link>
                    </AccordionItem>
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center">
            <Link href="/" className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="font-bold">BoomerHub</span>
            </Link>
        </div>
        
        {/* Right Side: Theme Toggle */}
        <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
      </div>
    </header>
  );
}
