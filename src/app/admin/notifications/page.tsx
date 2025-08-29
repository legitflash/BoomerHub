
import Link from 'next/link';
import { getAllSubmissions } from '@/services/submission-service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Inbox } from 'lucide-react';
import type { Submission } from '@/lib/types';

function SubmissionList({ submissions }: { submissions: Submission[] }) {
  if (submissions.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No submissions in this category.</p>;
  }

  const getSubmissionTypeBadge = (type: string) => {
    switch (type) {
      case 'Advertising':
        return 'default';
      case 'Writer Pitch':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {submissions.map((submission) => (
        <AccordionItem key={submission.id} value={submission.id}>
          <Card className="p-0">
            <AccordionTrigger className="p-4 text-left hover:no-underline">
              <div className="flex-1">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-4">
                    <Badge variant={getSubmissionTypeBadge(submission.type) as any}>{submission.type}</Badge>
                    <p className="font-semibold">{submission.subject || submission.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{submission.createdAt}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">From: {submission.name} ({submission.email})</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 border-t">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {submission.companyName && <p><strong>Company:</strong> {submission.companyName}</p>}
                {submission.portfolioLink && <p><strong>Portfolio:</strong> <a href={submission.portfolioLink} target="_blank" rel="noopener noreferrer">{submission.portfolioLink}</a></p>}
                {submission.socialProfileLink && <p><strong>Social Media:</strong> <a href={submission.socialProfileLink} target="_blank" rel="noopener noreferrer">{submission.socialProfileLink}</a></p>}
                <blockquote className="whitespace-pre-wrap">{submission.message}</blockquote>
              </div>
            </AccordionContent>
          </Card>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default async function AdminNotificationsPage() {
  const allSubmissions = await getAllSubmissions();

  const advertisingSubmissions = allSubmissions.filter(s => s.type === 'Advertising');
  const writerSubmissions = allSubmissions.filter(s => s.type === 'Writer Pitch');
  const contactSubmissions = allSubmissions.filter(s => s.type === 'Contact');

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin Panel
          </Link>
        </Button>
      </div>
      <header className="mb-12">
        <div className="flex items-center gap-4">
          <Inbox className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Notifications</h1>
            <p className="max-w-2xl mt-1 text-muted-foreground md:text-xl">
              Review and manage all form submissions from your users.
            </p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger value="all">All ({allSubmissions.length})</TabsTrigger>
          <TabsTrigger value="advertising">Advertising ({advertisingSubmissions.length})</TabsTrigger>
          <TabsTrigger value="writer">Writer Pitches ({writerSubmissions.length})</TabsTrigger>
          <TabsTrigger value="contact">Contact ({contactSubmissions.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
            <SubmissionList submissions={allSubmissions} />
        </TabsContent>
        <TabsContent value="advertising" className="mt-6">
            <SubmissionList submissions={advertisingSubmissions} />
        </TabsContent>
        <TabsContent value="writer" className="mt-6">
            <SubmissionList submissions={writerSubmissions} />
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
            <SubmissionList submissions={contactSubmissions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
