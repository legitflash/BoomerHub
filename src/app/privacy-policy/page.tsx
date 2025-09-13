
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getPageBySlug } from '@/services/page-service';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';

export default async function PrivacyPolicyPage() {
    const page = await getPageBySlug('privacy-policy');
     if (!page || !page.content) {
        return (
             <div className="container max-w-4xl py-12 md:py-24">
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                    Privacy Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Content not found. Please create a page in your CMS with the slug "privacy-policy".</p>
                </CardContent>
              </Card>
            </div>
        )
    }
  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            {page.title}
          </CardTitle>
           {page.updatedAt && (
            <CardDescription>
              Last Updated: {page.updatedAt}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
             <PortableText value={page.content} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
