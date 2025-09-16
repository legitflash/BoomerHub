
'use client';

import Link from "next/link";
import { Mail, MessageCircle, Youtube, Facebook, Instagram, Send, Twitter, User, FileText, Loader2 } from "lucide-react";
import { z } from 'zod';

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
import AdsterraBanner from '@/components/ads/adsterra-banner';
import { useNetlifyForm } from '@/hooks/use-netlify-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormSuccess } from "@/components/form-success";
import type { Metadata } from 'next';

// Note: Metadata in a client component is not directly supported. 
// For full SEO, this page would ideally be a server component, 
// or metadata would be handled in the parent layout.
// We can't set it here, but it's good practice to keep in mind.

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
        <path d="M7.5 12.5v7" />
        <path d="M7.5 12.5a4.5 4.5 0 1 0-4.5-4.5" />
    </svg>
);


const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function ContactPage() {
    const { form, onSubmit, isLoading, isSuccess } = useNetlifyForm({
        formName: 'contact',
        schema: formSchema,
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

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
                    {isSuccess ? (
                        <FormSuccess title="Message Sent!" message="Thank you for reaching out. We will get back to you as soon as possible." />
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                     <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your Name" icon={User} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="your@email.com" icon={Mail} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subject</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Question about a post" icon={FileText} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Your message..." className="min-h-[150px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="animate-spin" /> : <>Send Message <Send className="ml-2"/></>}
                                </Button>
                            </form>
                        </Form>
                    )}
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
                       <Link href="mailto:boomerhub1@gmail.com">
                            <Mail className="mr-2 h-5 w-5" /> Email boomerhub1@gmail.com
                       </Link>
                   </Button>
                    <Button asChild className="w-full" size="lg" variant="secondary">
                       <Link 
                          href="https://whatsapp.com/channel/0029Vb5nwfvInlqQa38G442f" 
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
                    <Link href="https://facebook.com/share/1DJFJQBCet/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook className="h-8 w-8" /></Link>
                    <Link href="https://www.instagram.com/legitflash01?igsh=MWczZHgxejAza2pjMw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram className="h-8 w-8" /></Link>
                    <Link href="https://x.com/legitflash_?s=21" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Twitter className="h-8 w-8" /></Link>
                    <Link href="https://www.youtube.com/@LegitFlash01" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Youtube className="h-8 w-8" /></Link>
                    <Link href="https://www.tiktok.com/@legitflash01" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><TikTokIcon /></Link>
                </CardContent>
            </Card>
        </div>
      </div>
      <AdsterraBanner />
    </div>
  );
}
