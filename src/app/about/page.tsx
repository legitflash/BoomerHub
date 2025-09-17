
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
  description: 'Discover BoomerHub\'s mission to deliver educational content and cutting-edge insights across finance, technology, entertainment, sports, AI, and social media to empower informed decision-making.',
};


export default async function AboutPage() {
  const teamMembers = await getAllTeamMembers();
  const aboutImage = placeholderImageData.about;

  return (
    <div className="container py-12 md:py-24 space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">About BoomerHub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground md:text-xl">
          BoomerHub is your trusted source for educational content and cutting-edge insights across finance, technology, entertainment, sports, AI, and social media. We empower readers with knowledge-driven articles and intelligent tools to make informed decisions in today's rapidly evolving digital landscape.
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
            In today's information-rich world, staying informed across multiple domains is crucial for success. Our mission is to bridge the knowledge gap by delivering high-quality educational content that makes complex topics accessible to everyone. We cover the pillars of modern life: financial literacy for smart money decisions, technology insights to keep you ahead of the curve, entertainment trends that shape culture, sports analysis for informed predictions, AI developments that impact daily life, and social media strategies for digital success.
          </p>
          <p className="text-muted-foreground">
            Whether you're seeking investment guidance, exploring the latest tech innovations, staying updated on entertainment industry shifts, analyzing sports predictions, understanding AI's impact on your profession, or optimizing your social media presence, BoomerHub transforms complexity into clarity through expert analysis and practical insights.
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
            <div className="text-4xl font-bold text-primary mb-2">Expert</div>
            <p className="text-muted-foreground">Editorial Review</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">Daily</div>
            <p className="text-muted-foreground">Content Updates</p>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground mb-2">
                  "BoomerHub's comprehensive coverage of tech trends and AI developments keeps me ahead in my field. Their educational approach makes complex topics accessible."
                </p>
                <div className="font-semibold">A.T.</div>
                <div className="text-xs text-muted-foreground">Technology Professional</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground mb-2">
                  "The financial insights and entertainment industry analysis have been invaluable for my portfolio decisions. Quality content that actually helps!"
                </p>
                <div className="font-semibold">S.C.</div>
                <div className="text-xs text-muted-foreground">Finance Professional</div>
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
