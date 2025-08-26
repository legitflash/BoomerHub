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

  const sections =
    course.slug === 'forex-crypto-basics'
      ? [
          {
            title: '1. What is Forex & Crypto?',
            lessons: ['Introduction to Financial Markets', 'Differences Between Forex and Crypto', 'Why Trade Them?'],
          },
          {
            title: '2. Setting Up Your Trading Accounts',
            lessons: ['Choosing a Reliable Forex Broker', 'Selecting a Secure Crypto Wallet', 'Navigating Crypto Exchanges'],
          },
          {
            title: '3. Candlesticks & Charts Explained',
            lessons: ['How to Read Candlestick Patterns', 'Understanding Market Structure', 'Introduction to Technical Indicators'],
          },
          { 
            title: '4. Spot Trading vs Futures', 
            lessons: ['Understanding Spot Trading', 'Introduction to Futures/Derivatives', 'Pros and Cons of Each'] 
          },
          {
            title: '5. Fundamental Risk Management',
            lessons: ['The Importance of Stop Loss', 'Understanding and Using Leverage Wisely', 'Position Sizing'],
          },
          { 
            title: '6. Your First Practice Session', 
            lessons: ['Setting Up a Demo Account', 'Executing Your First Demo Trade', 'Analyzing Your Trades'] 
          },
          { 
            title: '7. Quiz & Certification', 
            lessons: ['Final Assessment Quiz', 'Claiming Your Certificate'] 
          },
        ]
      : [
          { title: 'Introduction', lessons: ['Welcome', 'Course Overview'] },
          {
            title: 'Module 1: Fundamentals',
            lessons: ['Lesson 1.1', 'Lesson 1.2', 'Quiz 1'],
          },
          {
            title: 'Module 2: Advanced Techniques',
            lessons: ['Lesson 2.1', 'Lesson 2.2', 'Project'],
          },
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
            {course.slug === 'forex-crypto-basics' ? (
              <>
                <h2>About This Course</h2>
                <p>
                  Welcome to the ultimate beginner's guide to the exciting worlds of Forex and Cryptocurrency trading. If you've ever been curious about these markets but felt intimidated by the complexity, this course is designed for you. We'll demystify the jargon and provide a clear, step-by-step roadmap to get you started, even if you have zero prior experience.
                </p>
                <p>
                  Our goal is to empower you with the foundational knowledge and practical skills needed to navigate the markets with confidence. You'll learn how to analyze charts, manage risk, and execute trades on both demo and live accounts.
                </p>
                <h3>What You'll Learn:</h3>
                <ul>
                  <li>The core concepts of the Forex and Crypto markets.</li>
                  <li>How to set up and secure your trading and crypto accounts.</li>
                  <li>The basics of technical analysis, including reading charts and candlestick patterns.</li>
                  <li>Crucial risk management techniques to protect your capital.</li>
                  <li>The practical steps to place your first trade.</li>
                </ul>
                <h3>Who Is This Course For?</h3>
                <p>This course is perfect for absolute beginners with an interest in trading, individuals looking for a new side hustle, and anyone who wants to understand the financial markets that are shaping our world.</p>
              </>
            ) : (
               <>
                <h2>About this course</h2>
                <p>Here we would have a more detailed description of the course, what students will learn, who it's for, and any prerequisites. This is placeholder text to illustrate the layout.</p>
               </>
            )}
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
