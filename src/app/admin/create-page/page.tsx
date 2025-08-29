
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, FilePlus } from 'lucide-react';
import { createPage } from '@/services/page-service';


const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  content: z.string().min(50, { message: "Content must be at least 50 characters long. Use HTML for formatting." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatePage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            content: '',
        }
    });

    async function onSubmit(values: FormValues) {
        try {
            await createPage(values);
            toast({
                title: "Page Published!",
                description: "Your new page has been successfully published.",
                variant: "success",
            });
            router.push('/admin');
        } catch (error) {
             toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem creating your page. Please try again.",
                variant: "destructive",
            });
            console.error("Failed to create page:", error);
        }
    }

    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Button variant="outline" asChild>
                    <Link href="/admin">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Admin Panel
                    </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <FilePlus/> Create a New Page
                        </CardTitle>
                        <CardDescription>
                            Fill in the details below to publish a new standalone page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Page Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., About Us" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Page Content</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                  placeholder="Write your page content here. You can use HTML for formatting (e.g., <p>paragraph</p>, <b>bold</b>, <ul><li>list item</li></ul>)." 
                                                  className="min-h-[400px]" 
                                                  {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Publishing...' : 'Publish Page'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
