
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p>
              Your privacy is important to us. It is BoomerHub's policy to respect your privacy regarding any information we may collect from you across our website, <Link href="/" className="text-primary hover:underline">https://boomerhub.com</Link>, and other sites we own and operate.
            </p>

            <h2 className="!text-2xl font-bold">Information We Collect</h2>
            <p>
              We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
            </p>
            <p>
              We may collect information such as your name, email address, and IP address for purposes like newsletter subscriptions, form submissions, and analytics to improve user experience.
            </p>

            <h2 className="!text-2xl font-bold">Log Data</h2>
            <p>
              Like many site operators, we collect information that your browser sends whenever you visit our site. This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
            </p>

            <h2 className="!text-2xl font-bold">Cookies</h2>
            <p>
              We use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our site. We use cookies for tracking purposes for our advertising partners and for essential site functionality. Your consent for cookie usage will be requested upon visiting our site.
            </p>
            
            <h2 className="!text-2xl font-bold">Third-Party Services</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services, or to assist us in analyzing how our Service is used. These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. This includes ad networks like Google AdSense, Adsterra, and Monetag, which may use cookies to serve ads based on a user's prior visits to your website or other websites.
            </p>

            <h2 className="!text-2xl font-bold">Security</h2>
            <p>
              The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>
            
            <h2 className="!text-2xl font-bold">Links to Other Sites</h2>
            <p>
              Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
            
            <h2 className="!text-2xl font-bold">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="!text-2xl font-bold">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
