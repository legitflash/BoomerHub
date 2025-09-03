
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { createPost } from '@/services/post-service';
import { getAllCategories } from '@/services/category-service';
import { getAllTeamMembers } from '@/services/team-service';
import type { BlogCategory, TeamMember } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters long." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters long." }),
  category: z.string().min(1, { message: "Please select a category." }),
  image: z.string().url({ message: "Please enter a valid image URL." }),
  content: z.string().min(100, { message: "Content must be at least 100 characters long. Use HTML for formatting." }),
  author: z.string().min(1, { message: "Please select an author." }),
  keywords: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatePostPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { user, isAdmin, isEditor } = useAuth();
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            image: '',
            content: '',
            author: '',
            keywords: '',
        }
    });
    
    useEffect(() => {
        async function fetchData() {
            const [fetchedCategories, fetchedTeamMembers] = await Promise.all([
                getAllCategories(),
                getAllTeamMembers()
            ]);
            setCategories(fetchedCategories);
            setTeamMembers(fetchedTeamMembers);

            // Set default author if user is editor but not admin
            if (isEditor && !isAdmin && user) {
                const currentMember = fetchedTeamMembers.find(member => member.email === user.email);
                if (currentMember) {
                    form.setValue('author', currentMember.name, { shouldValidate: true });
                }
            }
        }
        if (user) {
          fetchData();
        }
    }, [isEditor, isAdmin, user, form]);


    async function onSubmit(values: FormValues) {
        try {
            await createPost(values);
            toast({
                title: "Post Published!",
                description: "Your new blog post has been successfully published.",
                variant: "success",
            });
            router.push('/admin');
        } catch (error) {
             toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem creating your post. Please try again.",
                variant: "destructive",
            });
            console.error("Failed to create post:", error);
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
                           <BookOpen/> Create a New Post
                        </CardTitle>
                        <CardDescription>
                            Fill in the details below to publish a new article to your blog.
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
                                            <FormLabel>Post Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., How to Start Forex Trading" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                        {categories.filter(c => c.slug !== 'betting-predictions').map(category => (
                                                            <SelectItem key={category.slug} value={category.name}>{category.name}</SelectItem>
                                                        ))}
                                                        </SelectContent>
                                                    </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="author"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Author</FormLabel>
                                                <Select 
                                                    onValueChange={field.onChange} 
                                                    value={field.value}
                                                    disabled={isEditor && !isAdmin}
                                                >
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an author" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                    {teamMembers.map(member => (
                                                        <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>
                                                    ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://example.com/image.jpg" {...field} />
                                            </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="keywords"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Keywords</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., forex, trading, finance" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Enter comma-separated keywords for better SEO. If empty, category will be used.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Short Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="A brief summary of your article..." {...field} />
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
                                            <FormLabel>Main Content</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                  placeholder="Write your full article here. You can use HTML for formatting (e.g., <p>paragraph</p>, <b>bold</b>, <a href='...'>link</a>)." 
                                                  className="min-h-[300px]" 
                                                  {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Publishing...' : 'Publish Post'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
