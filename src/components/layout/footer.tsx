
'use client';
import Link from 'next/link';
import { GraduationCap, Mail, MessageCircle, Twitter, Facebook, Instagram, Send } from 'lucide-react';
import { aiToolsCategories } from '@/lib/data';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { getAllCategories } from '@/services/category-service';
import type { BlogCategory } from '@/lib/types';


export function Footer() {
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategories();
      setBlogCategories(categories);
    }
    fetchCategories();
  }, []);

  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-12 text-sm">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold">BoomerHub</span>
            </div>
            <p>Insights for Growth.</p>
            <div className="flex gap-4 mt-2">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                <Link href="https://wa.me/2348060583504?text=Hello! I have a question about your services."  target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle className="h-5 w-5 hover:text-primary" /></Link>
                <Link href="mailto:support@boomerhub.com" aria-label="Email"><Mail className="h-5 w-5 hover:text-primary" /></Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Blog Categories</h4>
            <ul className="space-y-2">
              {blogCategories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/blog/category/${category.slug}`} className="text-muted-foreground hover:text-primary">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">AI Tools</h4>
            <ul className="space-y-2">
              {aiToolsCategories.map((tool) => (
                <li key={tool.slug}>
                  <Link href={tool.slug} className="text-muted-foreground hover:text-primary">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="space-y-4">
                <div className="flex space-x-4">
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-6 w-6" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-6 w-6" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-6 w-6" /></Link>
                </div>
                <div>
                    <h5 className="font-semibold">Join our exclusive Telegram channel for premium updates</h5>
                    <Button asChild className="mt-2" size="sm">
                        <Link href="#">
                            Subscribe <Send className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BoomerHub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
