'use client';

import { Newspaper, User, Mail, Link as LinkIcon, Send, Share2 } from "lucide-react";
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


export default function WriteForUsPage() {
  return (
    <div className="container py-12 md:py-24">
      <section className="text-center mb-16 max-w-3xl mx-auto">
        <Newspaper className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Write for BoomerHub</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Share your expertise with a dedicated audience and become a voice in the future of finance, tech, and online business.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6 prose prose-lg dark:prose-invert">
            <h2>Who We're Looking For</h2>
            <p>We are seeking passionate writers, industry experts, and thought leaders who can provide our readers with high-quality, actionable, and insightful content. If you have deep knowledge in any of our core categories, we want to hear from you.</p>
            <h3>Our Core Topics:</h3>
            <ul>
                <li>Personal Finance & Investing (Forex, Crypto)</li>
                <li>Artificial Intelligence & Technology Trends</li>
                <li>Social Media Monetization Strategies</li>
                <li>Freelancing, Side Hustles, and Online Business</li>
                <li>Productivity and Growth Hacking</li>
            </ul>
             <h3>What You Get:</h3>
            <p>You'll receive a byline, an author bio to promote your own work, and the opportunity to establish yourself as an authority in your field. We value our contributors and offer competitive rates for accepted articles.</p>
            <p>Use the form to submit your pitch. Please be concise and clearly explain your article idea and why it's a perfect fit for our audience.</p>
             <Button asChild className="w-full" size="lg" variant="secondary">
                <Link 
                    href="https://wa.me/2348060583504?text=Hello!%20I'm%20interested%20in%20writing%20for%20BoomerHub." 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <MessageCircle className="mr-2 h-5 w-5" /> Chat with our Editor
                </Link>
            </Button>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Submit Your Pitch</CardTitle>
                    <CardDescription>Tell us your article idea. We review submissions weekly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form name="writer-pitch" method="POST" data-netlify="true" className="space-y-4">
                    <input type="hidden" name="form-name" value="writer-pitch" />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" name="fullName" placeholder="Jane Doe" icon={User} required />
                        </div>
                        <div>
                           <Label htmlFor="email">Email Address</Label>
                           <Input id="email" name="email" type="email" placeholder="your@email.com" icon={Mail} required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="portfolioLink">Portfolio/Website (Optional)</Label>
                        <Input id="portfolioLink" name="portfolioLink" placeholder="https://your-blog.com" icon={LinkIcon} />
                    </div>
                    <div>
                        <Label htmlFor="socialProfileLink">Social Profile (Optional)</Label>
                        <Input id="socialProfileLink" name="socialProfileLink" placeholder="https://facebook.com/yourprofile" icon={Share2} />
                    </div>
                    <div>
                        <Label htmlFor="pitch">Your Pitch</Label>
                        <Textarea id="pitch" name="pitch" placeholder="Briefly describe your article idea and outline the key points..." className="min-h-[150px]" required />
                    </div>
                    <Button type="submit" className="w-full">
                       Submit Pitch <Send className="ml-2"/>
                    </Button>
                  </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
