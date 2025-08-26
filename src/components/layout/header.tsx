import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">Boomer Academy</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link href="/blog" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Blog
            </Link>
            <Link href="/courses" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Courses
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-2 p-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="font-bold">Boomer Academy</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                    <Link href="/blog" className="text-foreground">Blog</Link>
                    <Link href="/courses" className="text-foreground">Courses</Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <nav className="flex items-center">
            <Button>Get Certified</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
