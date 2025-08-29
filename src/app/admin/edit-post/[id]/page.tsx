
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getPostById } from '@/services/post-service';
import type { Post, BlogCategory } from '@/lib/types';
import { handleUpdatePost } from '@/app/actions';
import { getAllCategories } from '@/services/category-service';

const formSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters long." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters long." }),
  category: z.string().min(1, { message: "Please select a category." }),
  image: z.string().url({ message: "Please enter a valid image URL." }),
  content: z.string().min(100, { message: "Content must be at least 100 characters long. Use HTML for formatting." }),
  author: z.string().min(2, { message: "Author name must be at least 2 characters long." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<BlogCategory[]>([]);

    const id = params.id as string;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            image: '',
            content: '',
            author: '',
        }
    });

    useEffect(() => {
        async function fetchCategories() {
            const fetchedCategories = await getAllCategories();
            setCategories(fetchedCategories);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                setIsLoading(true);
                try {
                    const fetchedPost = await getPostById(id);
                    if (fetchedPost) {
                        setPost(fetchedPost);
                        form.reset(fetchedPost);
                    } else {
                        toast({ title: "Post not found", variant: "destructive" });
                        router.push('/admin');
                    }
                } catch (error) {
                    toast({ title: "Failed to fetch post", variant: "destructive" });
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchPost();
        }
    }, [id, form, router, toast]);

    async function onSubmit(values: FormValues) {
        if (!post) return;
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('slug', post.slug);
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });

            await handleUpdatePost(formData);
            
            toast({
                title: "Post Updated!",
                description: "The blog post has been successfully updated.",
                variant: "success",
            });
            router.push('/admin');
        } catch (error) {
             toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem updating the post. Please try again.",
                variant: "destructive",
            });
            console.error("Failed to update post:", error);
        }
    }
    
    if (isLoading) {
        return (
            <div className="container py-12 md:py-16">
                 <div className="max-w-3xl mx-auto">
                    <Skeleton className="h-10 w-48 mb-8" />
                    <Card>
                        <CardHeader>
                           <Skeleton className="h-8 w-1/2" />
                           <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <Skeleton className="h-10 w-full" />
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                             <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
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
                           <BookOpen/> Edit Post
                        </CardTitle>
                        <CardDescription>
                            Update the details for your post titled "{post?.title}".
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
                                                <FormLabel>Author Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., Jane Doe" {...field} />
                                                </FormControl>
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
                                    {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
