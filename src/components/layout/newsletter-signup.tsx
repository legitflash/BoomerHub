
'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Subscription failed');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Subscription Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
     <section className="border-t bg-background">
        <div className="container py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tighter font-headline">Subscribe to our Newsletter</h2>
                    <p className="text-muted-foreground">Get the latest posts and insights delivered to your inbox.</p>
                </div>
                 {isSuccess ? (
                    <div className="flex items-center gap-4 p-6 bg-green-50 text-green-800 rounded-lg dark:bg-green-900/20 dark:text-green-300">
                        <CheckCircle className="h-10 w-10 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Thank you for subscribing!</h3>
                            <p className="text-sm">You're all set. Check your inbox for the latest updates.</p>
                        </div>
                    </div>
                ) : (
                    <form 
                        onSubmit={handleSubmit}
                        className="flex items-center space-x-2"
                    >
                        <div className="flex-grow">
                            <Label htmlFor="newsletter-email" className="sr-only">Email</Label>
                            <Input 
                                id="newsletter-email" 
                                name="email" 
                                type="email" 
                                placeholder="Enter your email" 
                                required 
                                className="h-12"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" size="lg" className="h-12" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Subscribe'}
                        </Button>
                    </form>
                )}
            </div>
        </div>
     </section>
  );
}
