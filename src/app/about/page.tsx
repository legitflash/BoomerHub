
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllTeamMembers } from "@/services/team-service";
import AdsterraBanner from "@/components/ads/adsterra-banner";
import type { Metadata } from 'next';
import placeholderImageData from '@/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about the BoomerHub team and our mission to provide insightful articles and intelligent AI-powered tools for growth in the digital world.',
};


export default async function AboutPage() {
  const teamMembers = await getAllTeamMembers();
  const aboutImage = placeholderImageData.about;

  return (
    <div className="container py-12 md:py-24 space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">About BoomerHub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground md:text-xl">
          BoomerHub is your all-in-one platform for growth, combining insightful articles with intelligent, AI-powered tools to help you succeed in the digital world.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Image 
            src={aboutImage.src}
            alt={aboutImage.alt}
            width={aboutImage.width}
            height={aboutImage.height}
            data-ai-hint={aboutImage.dataAiHint}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter font-headline">Our Mission</h2>
          <p className="text-muted-foreground">
            In a rapidly changing world, knowledge is power. We provide reliable, practical information and intelligent tools to help you navigate the digital economy. From financial strategies and sports analysis to AI-powered content creation, we break down complex topics into easy-to-understand articles and actionable tools.
          </p>
          <p className="text-muted-foreground">
            Whether you're looking for the latest football predictions, exploring financial markets, or leveraging AI for your next project, our platform is your partner in growth.
          </p>
        </div>
      </section>

      <AdsterraBanner />

      {/* Trust and Social Proof Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold tracking-tighter font-headline mb-8">Trusted by Thousands</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <p className="text-muted-foreground">Monthly Readers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <p className="text-muted-foreground">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">AI Tools Created</p>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground mb-2">
                  "BoomerHub's AI tools have completely transformed how I approach content creation. The insights are incredibly accurate and save me hours of work."
                </p>
                <div className="font-semibold">John Smith</div>
                <div className="text-xs text-muted-foreground">Digital Marketing Manager</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground mb-2">
                  "The financial insights and sports predictions have been remarkably helpful for my investment decisions. Highly recommend!"
                </p>
                <div className="font-semibold">Maria Johnson</div>
                <div className="text-xs text-muted-foreground">Investment Advisor</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="text-center">
         <h2 className="text-3xl font-bold tracking-tighter font-headline mb-8">Meet the Team</h2>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="text-center">
                <CardContent className="p-6">
                  <Avatar className="h-24 w-24 mb-4 mx-auto">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
         </div>
      </section>
      
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter font-headline mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-8">
          Have questions, suggestions, or want to contribute? We'd love to hear from you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
                <Link href="/contact">
                    <Mail className="mr-2 h-5 w-5" /> Contact Us
                </Link>
            </Button>
        </div>
      </section>
    </div>
  )
}
