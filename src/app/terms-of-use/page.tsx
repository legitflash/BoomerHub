
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfUsePage() {
  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            Terms of Use
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p>
              Welcome to BoomerHub! These terms and conditions outline the rules and regulations for the use of our website, located at boomerhub.com. By accessing this website, we assume you accept these terms and conditions. Do not continue to use BoomerHub if you do not agree to all of the terms and conditions stated on this page.
            </p>

            <h2 className="!text-2xl font-bold">Intellectual Property Rights</h2>
            <p>
              Other than the content you own, under these Terms, BoomerHub and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.
            </p>

            <h2 className="!text-2xl font-bold">Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
              <li>Publishing any website material in any other media without our prior written consent.</li>
              <li>Selling, sublicensing, and/or otherwise commercializing any website material.</li>
              <li>Publicly performing and/or showing any website material.</li>
              <li>Using this website in any way that is or may be damaging to this website.</li>
              <li>Using this website in any way that impacts user access to this website.</li>
              <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this website.</li>
            </ul>

            <h2 className="!text-2xl font-bold">No Warranties</h2>
            <p>
              This website is provided "as is," with all faults, and BoomerHub expresses no representations or warranties, of any kind related to this website or the materials contained on this website. Also, nothing contained on this website shall be interpreted as advising you.
            </p>

            <h2 className="!text-2xl font-bold">Limitation of Liability</h2>
            <p>
              In no event shall BoomerHub, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract. BoomerHub, including its officers, directors, and employees, shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
            </p>

            <h2 className="!text-2xl font-bold">Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which the company is based, and you submit to the non-exclusive jurisdiction of the state and federal courts located in that jurisdiction for the resolution of any disputes.
            </p>
            
            <h2 className="!text-2xl font-bold">Contact Us</h2>
            <p>If you have any questions about these Terms of Use, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.</p>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
