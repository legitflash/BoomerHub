import Link from 'next/link';
import { GraduationCap, Mail, MessageCircle } from 'lucide-react';
import { blogCategories } from '@/lib/data';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-12 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold">BoomerHub</span>
            </div>
            <p>Learn Skills. Earn Income. Get Certified.</p>
            <div className="flex gap-4 mt-2">
                <Link href="#" aria-label="WhatsApp"><MessageCircle className="h-5 w-5 hover:text-primary" /></Link>
                <Link href="mailto:support@boomer.academy" aria-label="Email"><Mail className="h-5 w-5 hover:text-primary" /></Link>
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
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary">Courses</Link></li>
              <li><Link href="/certification" className="text-muted-foreground hover:text-primary">Claim Certificate</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
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
