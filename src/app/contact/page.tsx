
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleCreateSubmission } from '../actions';
import AdsterraBanner from '@/components/ads/adsterra-banner';


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});


export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submissionData = {
        ...values,
        type: 'Contact',
    };
    
    const result = await handleCreateSubmission(submissionData);

    if(result.success){
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. We'll get back to you soon.",
            variant: "success"
        });
        form.reset();
    } else {
        toast({
            title: "Submission Failed",
            description: "There was a problem sending your message. Please try again later.",
            variant: "destructive",
        });
    }
  }


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
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" name="contact" data-netlify="true">
                        <input type="hidden" name="form-name" value="contact" />
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your Name" {...field} />
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
                                  <Input placeholder="your@email.com" {...field} />
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
                                  <Input placeholder="Question about a post" {...field} />
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
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                           {form.formState.isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2"/>
                        </Button>
                      </form>
                    </Form>
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
