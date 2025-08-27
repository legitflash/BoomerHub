
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";

export default function FinancialAdviserPage() {
  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
            <PiggyBank className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Financial Adviser</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Get personalized financial advice to help you reach your goals.
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>
                    Our AI Financial Adviser will analyze your financial situation and provide personalized recommendations for budgeting, saving, and investing.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Stay tuned!</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
