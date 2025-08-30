
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Megaphone } from 'lucide-react';
import { createAdvertisement } from '@/services/ad-service';
import type { Advertisement } from '@/lib/types';


const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  content: z.string().min(10, { message: "Ad content/code must be at least 10 characters long." }),
  placement: z.enum(['before-post-content', 'after-post-content']),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateAdPage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            content: '',
            placement: 'before-post-content',
            isActive: true,
        }
    });

    async function onSubmit(values: FormValues) {
        try {
            await createAdvertisement(values);
            toast({
                title: "Advertisement Created!",
                description: "Your new ad has been successfully created.",
                variant: "success",
            });
            router.push('/admin');
        } catch (error) {
             toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem creating your ad. Please try again.",
                variant: "destructive",
            });
            console.error("Failed to create ad:", error);
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
                           <Megaphone/> Create a New Advertisement
                        </CardTitle>
                        <CardDescription>
                            Fill in the details below to add a new ad to your site.
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
                                            <FormLabel>Ad Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Header Banner Ad" {...field} />
                                            </FormControl>
                                            <FormDescription>This is for your internal reference.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="placement"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Placement</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a placement" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="before-post-content">Before Post Content</SelectItem>
                                                    <SelectItem value="after-post-content">After Post Content</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>Choose where this ad will be displayed.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ad Content / Code</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                  placeholder="Paste your ad code here (e.g., Google AdSense code, or an <img> tag)." 
                                                  className="min-h-[200px] font-mono text-xs" 
                                                  {...field} 
                                                />
                                            </FormControl>
                                            <FormDescription>You can use HTML. For an image, use: &lt;img src="..." alt="..." /&gt;</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Activate Ad</FormLabel>
                                                <FormDescription>
                                                   Use this switch to turn the ad on or off.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                
                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Creating...' : 'Create Advertisement'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
