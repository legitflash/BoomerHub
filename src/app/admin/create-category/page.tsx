
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
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Folder } from 'lucide-react';
import { createCategory } from '@/services/category-service';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  iconName: z.string().min(2, { message: "Icon name must be at least 2 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateCategoryPage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            iconName: '',
        }
    });

    async function onSubmit(values: FormValues) {
        try {
            await createCategory(values);
            toast({
                title: "Category Created!",
                description: "The new category has been successfully created.",
                variant: "success",
            });
            router.push('/admin');
        } catch (error) {
             toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem creating the category. Please try again.",
                variant: "destructive",
            });
            console.error("Failed to create category:", error);
        }
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
                           <Folder/> Create a New Category
                        </CardTitle>
                        <CardDescription>
                            Fill in the details below to add a new category for your blog posts.
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
                                    {form.formState.isSubmitting ? 'Creating...' : 'Create Category'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
