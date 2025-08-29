
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
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
            <p>
              This is a placeholder for your Privacy Policy. You should replace this content with your own policy.
            </p>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us. For example, we collect information when you create an account, subscribe, participate in any interactive features of our services, fill out a form, request customer support, or otherwise communicate with us.
            </p>
            <h2>How We Use Information</h2>
            <p>
              We may use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services;</li>
              <li>Process transactions and send you related information, including confirmations and invoices;</li>
              <li>Send you technical notices, updates, security alerts, and support and administrative messages;</li>
              <li>Respond to your comments, questions, and requests and provide customer service;</li>
            </ul>
            <h2>Sharing of Information</h2>
            <p>
              We may share information about you as follows or as otherwise described in this Privacy Policy:
            </p>
            <ul>
                <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf;</li>
                <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process;</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
