import Link from 'next/link';
import Image from 'next/image';
import { courses, courseTracks } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Our Courses</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Structured learning paths to master in-demand skills.
        </p>
      </header>

      {courseTracks.map(track => (
        <section key={track.slug} className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <track.icon className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tighter font-headline">{track.name}</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.filter(c => c.track === track.name).map((course) => (
              <Card key={course.slug} className="group flex flex-col overflow-hidden">
                <Link href={`/courses/${course.slug}`} className="block">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={600}
                    height={400}
                    data-ai-hint={course.dataAiHint}
                    className="rounded-t-lg object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <CardContent className="p-4 space-y-3 flex-grow flex flex-col">
                  <Link href={`/courses/${course.slug}`} className="block">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors flex-grow">{course.title}</h3>
                  </Link>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <BookOpen className="mr-1.5 h-4 w-4" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1.5 h-4 w-4" />
                      {course.hours} hours
                    </div>
                  </div>
                  {course.progress !== undefined && course.progress > 0 && (
                     <div className="space-y-1 pt-2">
                       <div className="flex justify-between text-xs text-muted-foreground">
                           <span>In Progress</span>
                           <span>{course.progress}%</span>
                       </div>
                       <Progress value={course.progress} className="h-2" />
                     </div>
                  )}
                  <div className="mt-auto pt-4">
                     <Button asChild variant="secondary" className="w-full">
                       <Link href={`/courses/${course.slug}`}>
                         {course.progress === 100 ? 'Review Course' : (course.progress ?? 0) > 0 ? 'Continue Learning' : 'Start Course'}
                         <ArrowRight className="ml-2 h-4 w-4" />
                       </Link>
                     </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
