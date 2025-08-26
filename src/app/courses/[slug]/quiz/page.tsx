import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, Trophy } from "lucide-react";


export default function QuizPage({ params }: { params: { slug: string } }) {
    const course = courses.find((c) => c.slug === params.slug);

    if (!course) {
        notFound();
    }

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
            </header>

            <form>
                <Card>
                    <CardContent className="p-6 space-y-8">
                        {quizQuestions.map((q, index) => (
                            <div key={index}>
                                <p className="font-semibold mb-4">{index + 1}. {q.question}</p>
                                <RadioGroup className="space-y-2">
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
                    <Button asChild size="lg">
                        <Link href={`/certification/view?course=${encodeURIComponent(course.title)}&user=${encodeURIComponent("Favour Uduafemhe")}`}>
                            Submit & View Certificate <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}
