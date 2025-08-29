
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
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, FolderCog } from 'lucide-react';
import { getCategoryById, updateCategory } from '@/services/category-service';
import type { BlogCategory } from '@/lib/types';
// import { handleUpdateCategory } from '@/app/actions';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  iconName: z.string().min(2, { message: "Icon name must be at least 2 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [category, setCategory] = useState<BlogCategory | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const id = params.id as string;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            iconName: '',
        }
    });

    useEffect(() => {
        if (id) {
            const fetchCategory = async () => {
                setIsLoading(true);
                try {
                    const fetchedCategory = await getCategoryById(id);
                    if (fetchedCategory) {
                        setCategory(fetchedCategory);
                        form.reset(fetchedCategory);
                    } else {
                        toast({ title: "Category not found", variant: "destructive" });
                        router.push('/admin');
                    }
                } catch (error) {
                    toast({ title: "Failed to fetch category", variant: "destructive" });
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCategory();
        }
    }, [id, form, router, toast]);

    async function onSubmit(values: FormValues) {
        if (!category) return;
        try {
            // This will be replaced by a server action later
            await updateCategory(id, values);
            
            toast({
                title: "Category Updated!",
                description: "The category has been successfully updated.",
                variant: "success",
            });
            router.push('/admin');
        } catch (error) {
             toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem updating the category. Please try again.",
                variant: "destructive",
            });
            console.error("Failed to update category:", error);
        }
    }
    
    if (isLoading) {
        return (
            <div className="container py-12 md:py-16">
                 <div className="max-w-xl mx-auto">
                    <Skeleton className="h-10 w-48 mb-8" />
                    <Card>
                        <CardHeader>
                           <Skeleton className="h-8 w-1/2" />
                           <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-xl mx-auto">
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
                           <FolderCog/> Edit Category
                        </CardTitle>
                        <CardDescription>
                           Update the details for the "{category?.name}" category.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Technology" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="iconName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Icon Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Code (from lucide-react)" {...field} />
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
