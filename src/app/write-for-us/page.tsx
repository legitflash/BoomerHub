
'use client';

import { Newspaper, User, Mail, Link as LinkIcon, Send, Share2, Loader2 } from "lucide-react";
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
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
import { useNetlifyForm } from '@/hooks/use-netlify-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormSuccess } from "@/components/form-success";

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  portfolioLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  socialProfileLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  pitch: z.string().min(20, 'Your pitch must be at least 20 characters'),
});


export default function WriteForUsPage() {
    const { form, onSubmit, isLoading, isSuccess } = useNetlifyForm({
        formName: 'writer-pitch',
        schema: formSchema,
        defaultValues: {
            fullName: '',
            email: '',
            portfolioLink: '',
            socialProfileLink: '',
            pitch: '',
        },
    });
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
                    href="https://whatsapp.com/channel/0029Vb5nwfvInlqQa38G442f" 
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
                    {isSuccess ? (
                        <FormSuccess title="Pitch Submitted!" message="Thank you for your submission! Our editorial team will review your pitch and get back to you if it's a good fit." />
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Jane Doe" icon={User} {...field} />
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
                                                <FormLabel>Email Address</FormLabel>
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
                                    name="portfolioLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Portfolio/Website (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://your-blog.com" icon={LinkIcon} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="socialProfileLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Social Profile (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://facebook.com/yourprofile" icon={Share2} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pitch"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Pitch</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Briefly describe your article idea and outline the key points..." className="min-h-[150px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="animate-spin" /> : <>Submit Pitch <Send className="ml-2"/></>}
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
