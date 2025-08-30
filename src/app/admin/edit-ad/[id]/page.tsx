
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Megaphone } from 'lucide-react';
import { getAdvertisementById } from '@/services/ad-service';
import type { Advertisement } from '@/lib/types';
import { handleUpdateAdvertisement } from '@/app/actions';

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  content: z.string().min(10, { message: "Ad content/code must be at least 10 characters long." }),
  placement: z.enum(['before-post-content', 'after-post-content']),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditAdPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [ad, setAd] = useState<Advertisement | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const id = params.id as string;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (id) {
            const fetchAd = async () => {
                setIsLoading(true);
                try {
                    const fetchedAd = await getAdvertisementById(id);
                    if (fetchedAd) {
                        setAd(fetchedAd);
                        form.reset(fetchedAd);
                    } else {
                        toast({ title: "Advertisement not found", variant: "destructive" });
                        router.push('/admin');
                    }
                } catch (error) {
                    toast({ title: "Failed to fetch ad", variant: "destructive" });
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAd();
        }
    }, [id, form, router, toast]);

    async function onSubmit(values: FormValues) {
        if (!ad) return;
        try {
            const formData = new FormData();
            formData.append('id', id);
            
            Object.entries(values).forEach(([key, value]) => {
                if (typeof value === 'boolean') {
                    formData.append(key, value ? 'on' : 'off');
                } else {
                    formData.append(key, value as string);
                }
            });

            await handleUpdateAdvertisement(formData);
            
            toast({
                title: "Advertisement Updated!",
                description: "The ad has been successfully updated.",
                variant: "success",
            });
            router.push('/admin');
        } catch (error) {
             toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem updating the ad. Please try again.",
                variant: "destructive",
            });
            console.error("Failed to update ad:", error);
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
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-16 w-full" />
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
                           <Megaphone/> Edit Advertisement
                        </CardTitle>
                        <CardDescription>
                           Update the details for the "{ad?.title}" ad.
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
