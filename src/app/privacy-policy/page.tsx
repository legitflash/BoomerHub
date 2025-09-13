
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // Set date on client to avoid hydration mismatch
    setLastUpdated(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  }, []);

  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            Privacy Policy
          </CardTitle>
          <p className="text-muted-foreground pt-2">Last Updated: {lastUpdated || '...'}</p>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
            <p>
              Welcome to BoomerHub ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services, including our AI-powered tools.
            </p>
            
            <h2>1. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            
            <h4>Personal Data</h4>
            <p>
              Personally identifiable information, such as your name and email address, that you voluntarily give to us when you subscribe to our newsletter or use our contact forms. You are under no obligation to provide us with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the Site.
            </p>
            
            <h4>AI Tool Interaction Data</h4>
            <p>When you use our AI-powered tools, we collect the information you provide to generate a response. This includes:</p>
            <ul>
                <li><strong>AI Financial Adviser:</strong> The questions and descriptions of your financial situation you provide.</li>
                <li><strong>AI Match Prediction:</strong> The team names, leagues, and dates you input for analysis.</li>
                <li><strong>AI Text Translator:</strong> The text you submit for translation.</li>
            </ul>
             <p>This information is sent to our third-party AI service provider (Google AI) to generate the output. We do not store the specific inputs or outputs from your interactions with these tools on our servers long-term.</p>
            
            <h4>Usage Data & IP Address</h4>
            <p>
              Our servers automatically collect standard log data when you access the Site, such as your IP address, browser type, and access times. We use your IP address for the following purposes:
            </p>
            <ul>
              <li><strong>Rate Limiting:</strong> To prevent abuse and ensure service availability for all users, we monitor the number of AI requests from a single IP address and enforce a daily limit. This is a security measure.</li>
              <li><strong>Analytics:</strong> To monitor and analyze usage and trends to improve your experience with the Site.</li>
            </ul>

            <h2>2. Cookies and Tracking Technologies</h2>
            <p>
                We use cookies and similar tracking technologies to operate and personalize our website. A cookie is a small file stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            <ul>
                <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function. For example, we use a cookie to remember your consent choices regarding other cookies.</li>
                <li><strong>Advertising Cookies:</strong> If you provide consent, our third-party advertising partners (like Monetag and Adsterra) will use cookies to display personalized advertisements based on your visits to this and other sites on the Internet. We do not have access to or control over these third-party cookies.</li>
            </ul>
            <p>You have the choice to accept or decline non-essential cookies through the consent banner that appears on your first visit.</p>

            <h2>3. How We Use Your Information</h2>
            <p>
              Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul>
              <li>Respond to your comments, questions, and requests and provide customer service.</li>
              <li>Send you our newsletter if you have subscribed.</li>
              <li>Operate and maintain our AI-powered tools and protect them from abuse.</li>
              <li>Monitor and analyze usage and trends to improve our Service.</li>
              <li>Serve personalized advertising, if you have given consent.</li>
            </ul>

            <h2>4. Disclosure of Your Information</h2>
            <p>
              We do not share, sell, rent, or trade your information with third parties for their commercial purposes. We may share information about you in the following situations:
            </p>
            <ul>
                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf. This includes our AI model provider (Google AI) for operating the AI tools, our email service provider (Resend) for newsletters, and our hosting provider (Netlify) for form submissions. Advertising partners may also collect data via cookies as described above.</li>
            </ul>
            
             <h2>5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h2>6. Policy for Children</h2>
            <p>
              We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.
            </p>
            
            <h2>7. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us through our <a href="/contact">contact page</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
