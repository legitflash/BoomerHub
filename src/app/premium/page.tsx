
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
  const router = useRouter();

  const handleSubscribe = (checkoutUrl: string) => {
    // In a real app, these URLs would be your actual Stripe/LemonSqueezy checkout links
    router.push(checkoutUrl);
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Access public posts and use our AI tools with a daily limit.",
      features: [
        "Read all public articles",
        "15 daily AI requests",
        "Standard email support"
      ],
      cta: "Current Plan",
      checkoutUrl: '#',
      disabled: true
    },
    {
      name: "Premium",
      price: "$2.99",
      description: "Unlock all content, advanced features, and higher AI limits.",
      features: [
        "Access to exclusive articles & tips",
        "50 daily AI requests",
        "Ad-free experience",
        "Priority customer support",
      ],
      cta: "Upgrade to Premium",
      checkoutUrl: 'https://buy.stripe.com/test_bIYg06d3e2aBceA000', // Example placeholder
      disabled: false,
      isPrimary: true,
    },
     {
      name: "VIP Tips",
      price: "$50",
      description: "For serious bettors who want our highest-confidence tips.",
      features: [
        "All features from Premium",
        "Exclusive VIP betting tips",
        "Direct chat with analysts",
        "In-depth market analysis",
        "Early access to all predictions"
      ],
      cta: "Get VIP Access",
      checkoutUrl: 'https://buy.stripe.com/test_7sI5kS9Z6eMX920eUU', // Example placeholder
      disabled: false,
      isPrimary: false,
    }
  ]

  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
         <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
            <Star className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Premium Plans</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Unlock exclusive content, advanced tools, and expert insights to get ahead.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map(plan => (
           <Card key={plan.name} className={`flex flex-col ${plan.isPrimary ? 'border-primary border-2 shadow-lg' : ''}`}>
             <CardHeader>
               <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
               <CardDescription>{plan.description}</CardDescription>
               <div className="pt-4">
                 <span className="text-4xl font-bold">{plan.price}</span>
                 <span className="text-muted-foreground">/month</span>
               </div>
             </CardHeader>
             <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
             </CardContent>
             <CardFooter>
               <Button 
                className="w-full" 
                onClick={() => handleSubscribe(plan.checkoutUrl)} 
                disabled={plan.disabled} 
                variant={plan.isPrimary ? 'default' : 'secondary'}
               >
                 {plan.cta}
               </Button>
             </CardFooter>
           </Card>
        ))}
      </div>
       <div className="text-center mt-12 max-w-2xl mx-auto">
        <p className="text-sm text-muted-foreground">
            Payments are processed securely by our third-party payment partner. After subscribing, you will receive an email with instructions on how to access your premium benefits.
        </p>
      </div>
    </div>
  );
}
