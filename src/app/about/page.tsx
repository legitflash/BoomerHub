
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
  description: 'Discover BoomerHub\'s mission to deliver practical guides, honest reviews, and smart recommendations through Get Paid To opportunities, How-To tutorials, Top Ten lists, Best picks, Reviews, News, and Betting Predictions.',
};


export default async function AboutPage() {
  const teamMembers = await getAllTeamMembers();
  const aboutImage = placeholderImageData.about;

  return (
    <div className="container py-12 md:py-24 space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">About BoomerHub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground md:text-xl">
          BoomerHub is your go-to platform for practical guides, honest reviews, and smart recommendations. From earning opportunities and how-to tutorials to top picks and betting insights, we deliver actionable content that helps you make informed decisions and discover the best options available.
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
            In a world full of options and opportunities, finding reliable guidance can be overwhelming. Our mission is to cut through the noise by delivering practical, actionable content across seven key areas: Get Paid To opportunities for earning online income, comprehensive How-To guides that walk you through processes step-by-step, curated Top Ten lists highlighting the best options, Top Best recommendations for superior choices, honest Reviews of products and services, breaking News to keep you informed, and expert Betting Predictions for sports enthusiasts.
          </p>
          <p className="text-muted-foreground">
            Whether you're looking to earn extra income online, need step-by-step tutorials, want to discover the top products in any category, seek honest reviews before making purchases, stay updated with the latest news, or analyze sports betting opportunities, BoomerHub provides clear, actionable insights that help you make smarter decisions.
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
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground mb-2">
                  "The Get Paid To opportunities and step-by-step how-to guides have helped me start earning extra income online. The instructions are clear and actually work!"
                </p>
                <div className="font-semibold">M.K.</div>
                <div className="text-xs text-muted-foreground">Online Entrepreneur</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground mb-2">
                  "Their honest reviews and top ten lists save me so much time when making purchases. Plus the betting predictions have been surprisingly accurate!"
                </p>
                <div className="font-semibold">J.L.</div>
                <div className="text-xs text-muted-foreground">Smart Shopper</div>
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
