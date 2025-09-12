'use client';

import { Megaphone, Building, User, Mail, Send, MessageCircle } from "lucide-react";
import Link from "next/link";

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
import AdsterraBanner from '@/components/ads/adsterra-banner';


export default function AdvertisePage() {
  return (
    <div className="container py-12 md:py-24">
      <section className="text-center mb-16 max-w-3xl mx-auto">
        <Megaphone className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Advertise with BoomerHub</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Connect with a growing community of engaged readers interested in finance, technology, and online entrepreneurship.
        </p>
      </section>

      <div className="my-8">
        <AdsterraBanner />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6 prose prose-lg dark:prose-invert">
            <h2>Why Advertise With Us?</h2>
            <p>BoomerHub is a fast-growing platform for individuals eager to learn and grow in the digital age. Our audience is ambitious, tech-savvy, and actively seeking tools and services to help them succeed.</p>
            <ul>
                <li><strong>Targeted Audience:</strong> Reach users interested in fintech, AI tools, social media marketing, and freelance opportunities.</li>
                <li><strong>High Engagement:</strong> Our readers are not just passive scrollers; they are active learners and doers.</li>
                <li><strong>Flexible Options:</strong> We offer sponsored posts, banner advertising, and custom partnership packages to fit your goals.</li>
            </ul>
            <p>Partner with us to place your brand in front of a dedicated and motivated audience. Fill out the form or contact us on WhatsApp to get in touch with our partnership team and receive our media kit.</p>
            <Button asChild className="w-full" size="lg" variant="secondary">
                <Link 
                    href="https://wa.me/2348060583504?text=Hello! I have a question about advertising with BoomerHub." 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
                </Link>
            </Button>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Partnership Inquiry</CardTitle>
                    <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form name="advertising" method="POST" data-netlify="true" className="space-y-4">
                    <input type="hidden" name="form-name" value="advertising" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" name="companyName" placeholder="Your Company, Inc." icon={Building} required />
                      </div>
                      <div>
                        <Label htmlFor="contactName">Your Name</Label>
                        <Input id="contactName" name="contactName" placeholder="John Doe" icon={User} required />
                      </div>
                    </div>
                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="your@company.com" icon={Mail} required />
                    </div>
                    <div>
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea id="message" name="message" placeholder="Tell us about your advertising goals..." className="min-h-[150px]" required />
                    </div>
                    <Button type="submit" className="w-full">
                       Send Inquiry <Send className="ml-2"/>
                    </Button>
                  </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
