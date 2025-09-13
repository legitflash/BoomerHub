
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function PrivacyPolicyPage() {
    const page = {
        title: 'Privacy Policy',
        updatedAt: 'July 22, 2024',
        content: `
<p>Your privacy is important to us. It is BoomerHub's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>

<h2>1. Information we collect</h2>

<h3>Log data</h3>
<p>When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.</p>

<h3>Device data</h3>
<p>We may also collect data about the device you’re using to access our website. This data may include the device type, operating system, unique device identifiers, device settings, and geo-location data. What we collect can depend on the individual settings of your device and software. We recommend checking the policies of your device manufacturer or software provider to learn what information they make available to us.</p>

<h3>Personal information</h3>
<p>We may ask for personal information, such as your: Name, Email, Social media profiles. This data is collected when you subscribe to our newsletter, fill out a form, or contact us.</p>

<h2>2. Legal bases for processing</h2>
<p>We will process your personal information lawfully, fairly, and in a transparent manner. We collect and process information about you only where we have legal bases for doing so.</p>
<p>These legal bases depend on the services you use and how you use them, meaning we collect and use your information only where:</p>
<ul>
    <li>it’s necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract (for example, when we provide a service you request from us);</li>
    <li>it satisfies a legitimate interest (which is not overridden by your data protection interests), such as for research and development, to market and promote our services, and to protect our legal rights and interests;</li>
    <li>you give us consent to do so for a specific purpose (for example, you might consent to us sending you our newsletter); or</li>
    <li>we need to process your data to comply with a legal obligation.</li>
</ul>

<h2>3. Use of information</h2>
<p>We may use a combination of information we collect, and information from third parties, to provide and improve our services, and for advertising and marketing. We will not use your data for any other purpose without your consent.</p>

<h2>4. Disclosure of personal information to third parties</h2>
<p>We may disclose personal information to: third party service providers for the purpose of enabling them to provide their services, including (without limitation) IT service providers, data storage, hosting and server providers, ad networks, analytics, error loggers, debt collectors, maintenance or problem-solving providers, marketing or advertising providers, professional advisors and payment systems operators.</p>

<h2>5. Your rights and controlling your personal information</h2>
<p>You always retain the right to withhold personal information from us, with the understanding that your experience of our website may be affected. We will not discriminate against you for exercising any of your rights over your personal information.</p>
<p>If you have any concerns about your privacy, you have the right to complain to a data protection authority about our collection and use of your personal information. You may contact us at <Link href="mailto:support@boomerhub.com">support@boomerhub.com</Link>.</p>

<h2>6. Cookies policy</h2>
<p>We use cookies to help improve your experience of our website. This cookies policy is part of BoomerHub's privacy policy, and covers the use of cookies between your device and our site. Refer to our Cookie Consent banner for more options.</p>

<h2>7. Changes to this policy</h2>
<p>At our discretion, we may change our privacy policy to reflect current acceptable practices. We will take reasonable steps to let users know about changes via our website. Your continued use of this site after any changes to this policy will be regarded as acceptance of our practices around privacy and personal information.</p>
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
