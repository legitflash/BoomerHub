
'use client';
import Link from 'next/link';
import { GraduationCap, Mail, MessageCircle, Twitter, Facebook, Instagram, Send } from 'lucide-react';
import { aiToolsCategories } from '@/lib/data';
import { useEffect, useState } from 'react';
import type { BlogCategory } from '@/lib/types';
import { getAllCategories } from '@/services/category-service';

export function Footer() {
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  
  useEffect(() => {
    async function fetchCategories() {
        try {
            const categories = await getAllCategories();
            const uniqueCategories = categories.filter(
                (category, index, self) =>
                index === self.findIndex((c) => c.slug === category.slug)
            );
            setBlogCategories(uniqueCategories);
        } catch (error) {
            console.error("Failed to fetch categories for footer:", error);
        }
    }
    fetchCategories();
  }, []);

  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-12 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 col-span-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold">BoomerHub</span>
            </div>
            <p>Insights for Growth.</p>
            <div className="flex gap-4 mt-2">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                <Link href="https://whatsapp.com/channel/0029Vb5nwfvInlqQa38G442f"  target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle className="h-5 w-5 hover:text-primary" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Telegram"><Send className="h-5 w-5"/></Link>
                <Link href="mailto:support@boomerhub.com" aria-label="Email"><Mail className="h-5 w-5 hover:text-primary" /></Link>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                    {aiToolsCategories.filter(tool => tool.slug !== '/ai/audio-transcriber').map((tool) => (
                        <li key={tool.slug}>
                        <Link href={tool.slug} className="text-muted-foreground hover:text-primary">
                            {tool.name}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-2">
                    <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                    <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                    <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                    <li><Link href="/advertise-with-us" className="text-muted-foreground hover:text-primary">Advertise with Us</Link></li>
                    <li><Link href="/write-for-us" className="text-muted-foreground hover:text-primary">Write for Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2">
                    <li><Link href="/terms-of-use" className="text-muted-foreground hover:text-primary">Terms of Use</Link></li>
                    <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                    </ul>
                </div>
              </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BoomerHub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
