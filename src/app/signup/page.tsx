
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
    displayName: z.string().min(3, { message: "Display name must be at least 3 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
});


type FormValues = z.infer<typeof formSchema>;

export default function SignUpPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { signUp, isLoading } = useAuth();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    async function onSubmit(values: FormValues) {
        try {
            await signUp(values.email, values.password, values.displayName);
            toast({
                title: "Account Created!",
                description: "You have successfully signed up. Welcome!",
                variant: "success",
            });
            router.push('/');
        } catch (error: any) {
            let errorMessage = "An unexpected error occurred. Please try again.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email address is already in use by another account.";
            }
            toast({
                title: "Sign Up Failed",
                description: errorMessage,
                variant: "destructive",
            });
            console.error("Sign up error:", error);
        }
    }

    return (
        <div className="container flex min-h-[80vh] items-center justify-center py-12">
             <div className="mx-auto w-full max-w-md">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
                        <CardDescription>
                            Join our community to get started.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                 <FormField
                                    control={form.control}
                                    name="displayName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Display Name</FormLabel>
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
                                                <Input type="email" placeholder="your@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                                    <UserPlus className="ml-2"/>
                                </Button>
                            </form>
                        </Form>
                         <div className="mt-6 text-center text-sm">
                           Already have an account?{' '}
                           <Link href="/login" className="font-semibold text-primary hover:underline">
                                Sign In
                           </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
