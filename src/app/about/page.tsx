
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllTeamMembers } from "@/services/team-service";

export default async function AboutPage() {
  const teamMembers = await getAllTeamMembers();
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
            src="https://picsum.photos/seed/data-analytics/600/400" 
            alt="BoomerHub Team Presentation" 
            width={600} 
            height={400} 
            data-ai-hint="data analytics"
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
