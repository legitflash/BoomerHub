
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleCreateSubmission } from '../actions';


const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
});


export default function AdvertisePage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submissionData = {
        ...values,
        name: values.contactName,
        subject: `Advertising Inquiry from ${values.companyName}`,
        type: 'Advertising',
    };
    
    const result = await handleCreateSubmission(submissionData);

    if(result.success){
        toast({
            title: "Inquiry Sent!",
            description: "Thank you for your interest. Our sales manager will be in touch shortly.",
            variant: "success",
        });
        form.reset();
    } else {
        toast({
            title: "Submission Failed",
            description: "There was a problem sending your inquiry. Please try again later.",
            variant: "destructive",
        });
    }
  }


  return (
    <div className="container py-12 md:py-24">
      <section className="text-center mb-16 max-w-3xl mx-auto">
        <Megaphone className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Advertise with BoomerHub</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Connect with a growing community of engaged readers interested in finance, technology, and online entrepreneurship.
        </p>
      </section>

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
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your Company, Inc." icon={Building} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="contactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" icon={User} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                         <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@company.com" icon={Mail} {...field} />
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
                                <FormLabel>Your Message</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Tell us about your advertising goals..." className="min-h-[150px]" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                           {form.formState.isSubmitting ? 'Sending...' : 'Send Inquiry'} <Send className="ml-2"/>
                        </Button>
                      </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
