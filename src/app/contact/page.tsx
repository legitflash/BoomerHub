'use client';

import Link from "next/link";
import { Mail, MessageCircle, Twitter, Facebook, Instagram, Send } from "lucide-react";

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


export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Contact Us</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          We're here to help. Whether you have a question, a suggestion, or a partnership proposal, please reach out.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form name="contact" method="POST" data-netlify="true" className="space-y-4">
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Your Name" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" name="subject" placeholder="Question about a post" required />
                    </div>
                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" placeholder="Your message..." className="min-h-[150px]" required />
                    </div>
                    <Button type="submit" className="w-full">
                       Send Message <Send className="ml-2"/>
                    </Button>
                  </form>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Other ways to connect</CardTitle>
                    <CardDescription>Reach out to us directly through these channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <Button asChild className="w-full" size="lg">
                       <Link href="mailto:support@boomerhub.com">
                            <Mail className="mr-2 h-5 w-5" /> Email support@boomerhub.com
                       </Link>
                   </Button>
                    <Button asChild className="w-full" size="lg" variant="secondary">
                       <Link 
                          href="https://wa.me/2348060583504?text=Hello! I have a question about your services." 
                          target="_blank" 
                          rel="noopener noreferrer"
                       >
                            <MessageCircle className="mr-2 h-5 w-5" /> Chat with us on WhatsApp
                       </Link>
                   </Button>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Follow us on social media</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center gap-6">
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-8 w-8" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-8 w-8" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-8 w-8" /></Link>
                </CardContent>
            </Card>
        </div>
      </div>
      <AdsterraBanner />
    </div>
  );
}
