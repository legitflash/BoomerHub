
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, UserCog } from 'lucide-react';
import { getTeamMemberById } from '@/services/team-service';
import type { TeamMember } from '@/lib/types';
import { handleUpdateTeamMember } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  image: z.string().url({ message: "Please enter a valid image URL." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  userRole: z.enum(['member', 'editor', 'admin']),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditMemberPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [member, setMember] = useState<TeamMember | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const id = params.id as string;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (id) {
            const fetchMember = async () => {
                setIsLoading(true);
                try {
                    const fetchedMember = await getTeamMemberById(id);
                    if (fetchedMember) {
                        setMember(fetchedMember);
                        form.reset({
                            name: fetchedMember.name,
                            role: fetchedMember.role,
                            image: fetchedMember.image,
                            description: fetchedMember.description,
                            email: fetchedMember.email || '',
                            userRole: fetchedMember.userRole || 'member',
                        });
                    } else {
                        toast({ title: "Member not found", variant: "destructive" });
                        router.push('/admin');
                    }
                } catch (error) {
                    toast({ title: "Failed to fetch member", variant: "destructive" });
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchMember();
        }
    }, [id, form, router, toast]);

    async function onSubmit(values: FormValues) {
        try {
            const formData = new FormData();
            formData.append('id', id);
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value as string);
            });

            await handleUpdateTeamMember(formData);
            
            toast({
                title: "Member Updated!",
                description: "The team member's details and role have been successfully updated.",
                variant: "success",
            });
            router.push('/admin');
        } catch (error) {
             toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem updating the team member. Please try again.",
                variant: "destructive",
            });
            console.error("Failed to update member:", error);
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
                            <Skeleton className="h-20 w-full" />
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
                           <UserCog/> Edit Team Member
                        </CardTitle>
                        <CardDescription>
                           Update the details for {member?.name}.
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
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Jane Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Public Role / Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Lead Developer, Senior Editor" {...field} />
                                            </FormControl>
                                             <FormDescription>This is the role displayed on their public profile.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User's Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="user@example.com" {...field} />
                                            </FormControl>
                                            <FormDescription>The email must match their registered user account to link them.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userRole"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Role</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role for this user" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="member">Member</SelectItem>
                                                    <SelectItem value="editor">Editor</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>This sets their permissions (e.g., Editor can write posts).</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="A short bio about the team member." {...field} />
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
