
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

    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Submission Error',
        description: 'Something went wrong. Please try again.',
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
                        name="newsletter" 
                        method="POST" 
                        data-netlify="true" 
                        data-netlify-honeypot="bot-field"
                        onSubmit={handleSubmit}
                        className="flex items-center space-x-2"
                    >
                        <input type="hidden" name="form-name" value="newsletter" />
                        <p className="hidden">
                            <label>
                            Don’t fill this out if you’re human: <input name="bot-field" />
                            </label>
                        </p>
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
