
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function PremiumPage() {
  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
         <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
            <Star className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Premium Features</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Unlock exclusive content, advanced tools, and more.
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>
                    We are working on exciting premium features that will be available here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Stay tuned for updates!</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
