
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function TermsOfUsePage() {
    const page = {
        title: 'Terms of Use',
        updatedAt: 'July 22, 2024',
        content: `
<p>Welcome to BoomerHub. By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

<h2>1. Use License</h2>
<ol type="a">
    <li>Permission is granted to temporarily download one copy of the materials (information or software) on BoomerHub's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        <ol type="i">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on BoomerHub's website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ol>
    </li>
    <li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by BoomerHub at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>
</ol>

<h2>2. Disclaimer</h2>
<p>The materials on BoomerHub's website are provided on an 'as is' basis. BoomerHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
<p>Further, BoomerHub does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site. The information provided is for informational purposes only and does not constitute financial, legal, or professional advice. Please gamble responsibly.</p>

<h2>3. Limitations</h2>
<p>In no event shall BoomerHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BoomerHub's website, even if BoomerHub or a BoomerHub authorized representative has been notified orally or in writing of the possibility of such damage.</p>

<h2>4. Accuracy of Materials</h2>
<p>The materials appearing on BoomerHub's website could include technical, typographical, or photographic errors. BoomerHub does not warrant that any of the materials on its website are accurate, complete or current. BoomerHub may make changes to the materials contained on its website at any time without notice. However BoomerHub does not make any commitment to update the materials.</p>

<h2>5. Links</h2>
<p>BoomerHub has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by BoomerHub of the site. Use of any such linked website is at the user's own risk.</p>

<h2>6. Modifications</h2>
<p>BoomerHub may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>

<h2>7. Governing Law</h2>
<p>These terms and conditions are governed by and construed in accordance with the laws of Nigeria and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
`
    };

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
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6" dangerouslySetInnerHTML={{ __html: page.content }} />
        </CardContent>
      </Card>
    </div>
  );
}
