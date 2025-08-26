'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, GraduationCap, ChevronDown, User, LogOut } from 'lucide-react';
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
import { blogCategories } from '@/lib/data';
import { useAuth } from '@/context/auth-context';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-foreground/60 transition-colors hover:text-foreground/80">
    {children}
  </Link>
);

export function Header() {
  const { user, signOutUser } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground/80 focus:outline-none">
              Blog <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {blogCategories.map((category) => (
                <DropdownMenuItem key={category.slug} asChild>
                  <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground/80 focus:outline-none">
              Courses <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/courses?level=free">Free Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/courses?level=premium">Premium Courses</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavLink href="/certification">Certification</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
        
        {/* Mobile Nav and Centered Logo */}
        <div className="flex flex-1 items-center justify-between">
          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
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
                    <AccordionItem value="blog">
                      <AccordionTrigger>Blog</AccordionTrigger>
                      <AccordionContent className="flex flex-col space-y-2 pl-4">
                         {blogCategories.map((category) => (
                          <Link key={category.slug} href={`/blog/category/${category.slug}`}>{category.name}</Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="courses">
                      <AccordionTrigger>Courses</AccordionTrigger>
                      <AccordionContent className="flex flex-col space-y-2 pl-4">
                        <Link href="/courses?level=free">Free Courses</Link>
                        <Link href="/courses?level=premium">Premium Courses</Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="flex flex-col space-y-3 mt-4 border-t pt-4">
                    <Link href="/certification" className="text-foreground">Certification</Link>
                    <Link href="/about" className="text-foreground">About</Link>
                    <Link href="/contact" className="text-foreground">Contact</Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Centered App Logo/Name */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold">BoomerHub</span>
            </Link>
          </div>

          {/* Sign In Button / User Menu */}
          <div className="flex items-center gap-2">
            {user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <Avatar className="h-8 w-8">
                       <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                     </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOutUser}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
