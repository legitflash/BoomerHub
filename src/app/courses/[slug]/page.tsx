import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { courses } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, BookOpen, Clock, Award, FileText, Star } from 'lucide-react';

type Section = {
  title: string;
  lessons: string[];
};

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  const courseSections: { [key: string]: Section[] } = {
    'forex-crypto-basics': [
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
      { title: '4. Spot Trading vs Futures', lessons: ['Understanding Spot Trading', 'Introduction to Futures/Derivatives', 'Pros and Cons of Each'] },
      {
        title: '5. Fundamental Risk Management',
        lessons: ['The Importance of Stop Loss', 'Understanding and Using Leverage Wisely', 'Position Sizing'],
      },
      { title: '6. Your First Practice Session', lessons: ['Setting Up a Demo Account', 'Executing Your First Demo Trade', 'Analyzing Your Trades'] },
      { title: '7. Quiz & Certification', lessons: ['Final Assessment Quiz', 'Claiming Your Certificate'] },
    ],
    'social-media-monetization-mastery': [
        { title: '1. Creating a Facebook Page for Business', lessons: ['Page Setup and Optimization', 'Content Strategy for Engagement', 'Facebook Ads Basics'] },
        { title: '2. Growing on Instagram & Reels', lessons: ['Mastering the Instagram Algorithm', 'Creating Viral Reels', 'Influencer Collaboration'] },
        { title: '3. TikTok Growth Hacks (2025 edition)', lessons: ['Understanding TikTok Trends', 'Monetizing through a-z', 'Going Live with a Purpose'] },
        { title: '4. YouTube Monetization', lessons: ['Optimizing Shorts for Views', 'Strategies for Long-Form Content', 'Maximizing AdSense Revenue'] },
        { title: '5. WhatsApp Business & Telegram Channels', lessons: ['Building a Community on WhatsApp', 'Monetizing Telegram Channels', 'Automating Communication'] },
        { title: '6. Building a Personal Brand Online', lessons: ['Defining Your Niche and Voice', 'Content Pillars and Strategy', 'Networking and Collaboration'] },
        { title: '7. Final Project', lessons: ['Create a Monetized Social Account', 'Peer Review and Feedback'] },
        { title: '8. Quiz & Certification', lessons: ['Final Assessment Quiz', 'Claiming Your Certificate'] },
    ],
    'ai-no-code-skills-for-side-hustles': [
      { title: '1. Intro to AI Tools', lessons: ['ChatGPT & Gemini Explained', 'Image Generation with MidJourney', 'Exploring other AI models'] },
      { title: '2. Prompt Engineering Basics', lessons: ['The Art of the Perfect Prompt', 'Advanced Prompting Techniques', 'Building Custom Instructions'] },
      { title: '3. AI Content Creation', lessons: ['Generating Blog Posts & Articles', 'Creating Video Scripts and Reels', 'Designing Images and Graphics with AI'] },
      { title: '4. No-Code Website/App Building', lessons: ['Intro to Glide, Bubble & Thunkable', 'Building a Simple App with Glide', 'Automating with Zapier'] },
      { title: '5. How to Create a Telegram Bot with AI', lessons: ['Setting up your Bot with BotFather', 'No-code bot platforms', 'Integrating with AI APIs'] },
      { title: '6. Freelancing with AI', lessons: ['Top AI-powered Gigs on Fiverr & Upwork', 'Pricing Your AI Services', 'Creating a Portfolio of AI Work'] },
      { title: '7. Launch Your AI-Powered Side Hustle', lessons: ['Finding a Niche', 'Developing a Business Plan', 'Marketing Your Product/Service'] },
      { title: '8. Quiz & Certification', lessons: ['Final Assessment Quiz', 'Claiming Your Certificate'] },
    ],
    default: [
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
    ],
  };

  const sections = courseSections[course.slug] || courseSections.default;

  const courseDescriptions: { [key: string]: React.ReactNode } = {
    'forex-crypto-basics': (
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
    ),
     'social-media-monetization-mastery': (
      <>
        <h2>About This Course</h2>
        <p>
          Unlock the full potential of social media and turn your online presence into a profitable venture. This comprehensive course covers everything you need to know about building, growing, and monetizing accounts on major platforms like Facebook, Instagram, TikTok, and YouTube.
        </p>
        <p>
          From content strategy and algorithm hacks to personal branding and community building, we provide a step-by-step blueprint for success. Whether you're a business owner, aspiring influencer, or content creator, this course will equip you with the skills to thrive in the digital landscape.
        </p>
        <h3>What You'll Learn:</h3>
        <ul>
          <li>Platform-specific strategies for Facebook, Instagram, TikTok, and YouTube.</li>
          <li>How to create engaging content that goes viral.</li>
          <li>Proven monetization techniques for each platform.</li>
          <li>The art of building an authentic and powerful personal brand.</li>
          <li>Leveraging WhatsApp and Telegram for business growth.</li>
        </ul>
        <h3>Who Is This Course For?</h3>
        <p>This course is ideal for entrepreneurs, marketers, content creators, and anyone looking to build a profitable online brand using social media.</p>
      </>
    ),
    'ai-no-code-skills-for-side-hustles': (
        <>
            <h2>About This Course</h2>
            <p>
                Dive into the future of work and entrepreneurship. This course is your gateway to mastering the most sought-after AI and no-code tools that are revolutionizing how we create, build, and earn online. You don't need to be a programmer to build powerful applications and businesses.
            </p>
            <p>
                We'll guide you through using tools like ChatGPT and MidJourney for content creation, and platforms like Glide and Bubble to build apps without writing a single line of code. You'll learn practical skills to launch your own side hustle or become a highly-demanded freelancer in the new digital economy.
            </p>
            <h3>What You'll Learn:</h3>
            <ul>
                <li>Mastering generative AI for text, images, and video.</li>
                <li>The fundamentals of prompt engineering to get the best results from AI.</li>
                <li>How to build functional websites and mobile apps with no-code tools.</li>
                <li>Creating and integrating AI-powered Telegram bots.</li>
                <li>Identifying and landing freelance gigs that leverage your new AI skills.</li>
            </ul>
            <h3>Who Is This Course For?</h3>
            <p>This course is for aspiring entrepreneurs, freelancers, marketers, and anyone curious about using AI and no-code platforms to create new income streams and innovative projects.</p>
        </>
    ),
    default: (
      <>
        <h2>About this course</h2>
        <p>Here we would have a more detailed description of the course, what students will learn, who it's for, and any prerequisites. This is placeholder text to illustrate the layout.</p>
      </>
    ),
  };

  const descriptionContent = courseDescriptions[course.slug] || courseDescriptions.default;

  const isCompleted = course.progress === 100;
  const buttonText = isCompleted ? 'Take Quiz' : (course.progress ?? 0) > 0 ? 'Continue Learning' : 'Start Course';

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
            {descriptionContent}
          </div>
        </div>

        <aside className="md:col-span-1 space-y-6">
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
            <div className="space-y-2 mb-4">
                <Progress value={course.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">{course.progress ?? 0}% complete</p>
            </div>
            <Button asChild={isCompleted} className="w-full" size="lg">
              {isCompleted ? (
                 <Link href={`/courses/${course.slug}/quiz`}>
                    <Trophy className="mr-2 h-5 w-5" /> Take Quiz
                 </Link>
              ) : (
                <button>{buttonText}</button>
              )}
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
