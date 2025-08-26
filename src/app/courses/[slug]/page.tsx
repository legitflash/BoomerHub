import { notFound } from 'next/navigation';
import Image from 'next/image';
import { courses } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, BookOpen, Clock, Award, FileText } from 'lucide-react';

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  const sections = [
    { title: 'Introduction', lessons: ['Welcome', 'Course Overview'] },
    { title: 'Module 1: Fundamentals', lessons: ['Lesson 1.1', 'Lesson 1.2', 'Quiz 1'] },
    { title: 'Module 2: Advanced Techniques', lessons: ['Lesson 2.1', 'Lesson 2.2', 'Project'] },
    { title: 'Conclusion', lessons: ['Final Summary', 'Next Steps'] },
  ];

  return (
    <div className="container max-w-5xl py-12 md:py-16">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <header className="mb-8">
            <p className="text-primary font-semibold mb-2">{course.track}</p>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground">{course.description}</p>
          </header>
          
          <div className="mb-8">
            <Image
              src={course.image}
              alt={course.title}
              width={800}
              height={450}
              data-ai-hint={course.dataAiHint}
              className="rounded-lg object-cover w-full aspect-video"
              priority
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>About this course</h2>
            <p>Here we would have a more detailed description of the course, what students will learn, who it's for, and any prerequisites. This is placeholder text to illustrate the layout.</p>
          </div>
        </div>

        <aside className="md:col-span-1 space-y-6">
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
            <div className="space-y-2 mb-4">
                <Progress value={course.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">{course.progress ?? 0}% complete</p>
            </div>
            <Button className="w-full" size="lg">
              {course.progress === 100 ? 'Get Certificate' : (course.progress ?? 0) > 0 ? 'Continue Learning' : 'Start Course'}
            </Button>
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-muted-foreground"/> <span>{course.lessons} lessons</span></div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground"/> <span>{course.hours} hours</span></div>
                <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground"/> <span>Projects</span></div>
                <div className="flex items-center gap-2"><Award className="h-4 w-4 text-muted-foreground"/> <span>Certificate</span></div>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-4">Course Content</h3>
            <Accordion type="single" collapsible defaultValue="item-0">
              {sections.map((section, sectionIndex) => (
                <AccordionItem key={sectionIndex} value={`item-${sectionIndex}`}>
                  <AccordionTrigger className="font-semibold">{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 pl-2">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span className="flex-1">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </aside>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}
