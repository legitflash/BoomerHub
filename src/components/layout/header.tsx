
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, GraduationCap, ChevronDown, Bot, Shield, User, LogOut, Bookmark, LogIn, UserPlus, Edit } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { aiToolsCategories } from '@/lib/data';
import { useState, useEffect } from 'react';
import { getAllCategories } from '@/services/category-service';
import type { BlogCategory } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';


const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-foreground/60 transition-colors hover:text-foreground/80">
    {children}
  </Link>
);

export function Header() {
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const { user, isAdmin, isEditor, signOutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategories();
      setBlogCategories(categories);
    }
    fetchCategories();
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/');
  }
  
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
                     {(isAdmin || isEditor) && (
                        <AccordionItem value="admin" className="border-b-0">
                            <Link href="/admin" className="font-semibold text-primary flex items-center gap-2 py-4 w-full block"><Shield/> {isAdmin ? 'Admin Panel' : 'Editor Dashboard'}</Link>
                        </AccordionItem>
                     )}
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
        
        {/* Right Side: Profile Icon */}
        <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    {user ? (
                        <>
                            <AvatarImage src={user.photoURL || undefined} alt={user.email || 'User'} />
                            <AvatarFallback>
                              {user.email ? user.email.charAt(0).toUpperCase() : <User />}
                            </AvatarFallback>
                        </>
                    ) : (
                        <AvatarFallback>
                            <User/>
                        </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {user ? (
                  <>
                      <DropdownMenuItem disabled>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                       <DropdownMenuItem asChild>
                         <Link href="/profile" className="flex items-center"><User className="mr-2"/> My Profile</Link>
                      </DropdownMenuItem>
                      {(isAdmin || isEditor) && (
                        <DropdownMenuItem asChild>
                            <Link href="/admin" className="flex items-center">
                               {isAdmin ? <Shield className="mr-2"/> : <Edit className="mr-2"/>} 
                               {isAdmin ? 'Admin Panel' : 'Editor Dashboard'}
                            </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                        <LogOut className="mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                        <Link href="/login" className="flex items-center"><LogIn className="mr-2"/> Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/signup" className="flex items-center"><UserPlus className="mr-2"/> Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
