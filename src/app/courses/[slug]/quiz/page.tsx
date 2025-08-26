'use client';
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { courses } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, Trophy, Lock } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export default function QuizPage({ params }: { params: { slug: string } }) {
    const course = courses.find((c) => c.slug === params.slug);
    const { user } = useAuth();
    const router = useRouter();

    if (!course) {
        notFound();
    }

    const isPremium = course.level === 'Premium';

    const quizQuestions = [
        {
            question: "This is a placeholder question for the quiz. In a real application, this would be a relevant question about the course content. What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            answer: "Paris",
        },
        {
            question: "Here is another placeholder question. What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4",
        },
        {
            question: "This is a final placeholder question to demonstrate the quiz functionality. Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars",
        },
    ];

    const completionDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would grade the quiz here.
        // For now, we'll just proceed to the certificate.
        const userName = user?.displayName || user?.email || "Valued Student";
        router.push(`/certification/view?course=${encodeURIComponent(course.title)}&user=${encodeURIComponent(userName)}&date=${encodeURIComponent(completionDate)}`);
    }

    const GetCertificateButton = () => {
        if (!user) {
            return (
                <Button onClick={() => router.push(`/auth/login?redirect=/courses/${course.slug}/quiz`)}>
                    Sign In to Continue <Lock className="ml-2 h-4 w-4" />
                </Button>
            );
        }
        
        if (isPremium) {
            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button size="lg">Submit & Claim Certificate <ArrowRight className="ml-2 h-5 w-5" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Unlock Your Premium Certificate</AlertDialogTitle>
                        <AlertDialogDescription>
                            To receive your official, verifiable certificate for "{course.title}", a one-time payment is required. This confirms your achievement and allows you to share it on LinkedIn, your CV, and more.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                         {/* In a real app, this would link to a payment page */}
                        <AlertDialogAction onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}>
                            Proceed to Payment
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        }

        return (
             <Button type="submit" size="lg">
                Submit & View Certificate <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        )
    }

    return (
        <div className="container py-12 md:py-24 max-w-2xl">
            <header className="text-center mb-12">
                <Trophy className="h-12 w-12 mx-auto text-primary mb-4" />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                    {course.title} Quiz
                </h1>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
                    Test your knowledge to earn your certificate. You need to score 70% or higher to pass.
                </p>
                 {isPremium && (
                    <p className="text-sm mt-2 p-2 bg-accent/20 text-accent-foreground rounded-md">
                        This is a premium course. A payment is required to unlock the certificate upon passing.
                    </p>
                )}
            </header>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardContent className="p-6 space-y-8">
                        {quizQuestions.map((q, index) => (
                            <div key={index}>
                                <p className="font-semibold mb-4">{index + 1}. {q.question}</p>
                                <RadioGroup required className="space-y-2">
                                    {q.options.map(option => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`q${index}-${option}`} />
                                            <Label htmlFor={`q${index}-${option}`}>{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <div className="mt-8 flex justify-center">
                    <GetCertificateButton />
                </div>
            </form>
        </div>
    );
}
