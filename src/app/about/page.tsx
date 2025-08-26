import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutPage() {
  const teamMembers = [
    { name: 'Jane Doe', role: 'Founder & CEO', image: 'https://picsum.photos/100/100' },
    { name: 'John Smith', role: 'Lead Instructor', image: 'https://picsum.photos/100/100' },
    { name: 'Alex Johnson', role: 'Community Manager', image: 'https://picsum.photos/100/100' },
  ];

  return (
    <div className="container py-12 md:py-24 space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">About Boomer Academy</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground md:text-xl">
          We are dedicated to providing accessible, high-quality education to help individuals acquire valuable skills, generate income, and achieve certification. Our mission is to empower people for the digital economy.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Image 
            src="https://picsum.photos/600/400" 
            alt="Boomer Academy Team" 
            width={600} 
            height={400} 
            data-ai-hint="team working"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter font-headline">Our Mission</h2>
          <p className="text-muted-foreground">
            In a rapidly changing world, continuous learning is key. Boomer Academy was founded on the principle that everyone deserves the chance to upskill and adapt. We break down complex topics into easy-to-understand courses and articles, focusing on practical knowledge that can be applied immediately to earn income or start a new career.
          </p>
          <p className="text-muted-foreground">
            Whether you're exploring forex, mastering AI tools, or building a social media empire, we're your partner in growth.
          </p>
        </div>
      </section>

      <section className="text-center">
         <h2 className="text-3xl font-bold tracking-tighter font-headline mb-8">Meet the Team</h2>
         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
         </div>
      </section>
      
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter font-headline mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-8">
          Have questions or want to collaborate? We'd love to hear from you. Reach out through any of our channels.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
                <Link href="mailto:support@boomeracademy.com">
                    <Mail className="mr-2 h-5 w-5" /> Email Us
                </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
                <Link href="#">
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                </Link>
            </Button>
        </div>
        <div className="flex justify-center gap-6 mt-8">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
        </div>
      </section>
    </div>
  )
}
