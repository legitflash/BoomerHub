import { Mail, MessageCircle, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Contact Us</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          We're here to help. Whether you have a question about our courses, a suggestion, or a partnership proposal, please reach out.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                             <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Your Name" />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="your@email.com" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="Question about a course" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Your message..." className="min-h-[150px]" />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Other ways to connect</CardTitle>
                    <CardDescription>Reach out to us directly through these channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <Button asChild className="w-full" size="lg">
                       <Link href="mailto:support@boomer.academy">
                            <Mail className="mr-2 h-5 w-5" /> Email support@boomer.academy
                       </Link>
                   </Button>
                    <Button asChild className="w-full" size="lg" variant="secondary">
                       <Link href="#">
                            <MessageCircle className="mr-2 h-5 w-5" /> Chat with us on WhatsApp
                       </Link>
                   </Button>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Follow us on social media</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center gap-6">
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-8 w-8" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-8 w-8" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-8 w-8" /></Link>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
