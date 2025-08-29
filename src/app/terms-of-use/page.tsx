
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
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
            <p>
              This is a placeholder for your Terms of Use. You should replace this content with your own terms.
            </p>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <h2>2. User Conduct</h2>
            <p>
              You agree not to use the service for any illegal or unauthorized purpose. You agree to comply with all laws, rules, and regulations applicable to your use of the service.
            </p>
            <h2>3. Intellectual Property</h2>
            <p>
             The Service and its original content, features, and functionality are and will remain the exclusive property of BoomerHub and its licensors.
            </p>
            <h2>4. Termination</h2>
            <p>
             We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
