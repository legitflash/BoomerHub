
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
              Personally identifiable information, such as your name and email address, that you voluntarily give to us when you use our contact form. You are under no obligation to provide us with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the Site.
            </p>
            
            <h4>AI Tool Interaction Data</h4>
            <p>When you use our AI-powered tools, we collect the information you provide to generate a response. This includes:</p>
            <ul>
                <li><strong>AI Financial Adviser:</strong> The questions and descriptions of your financial situation you provide.</li>
                <li><strong>AI Match Prediction:</strong> The team names, leagues, and dates you input for analysis.</li>
                <li><strong>AI Audio Transcriber:</strong> The audio files you upload for transcription. This data is processed to provide the service and is not stored on our servers after the transcription is complete.</li>
            </ul>
             <p>This information is sent to our third-party AI service provider (Google AI) to generate the output. We do not store the specific inputs or outputs from your interactions with these tools on our servers long-term.</p>
            
            <h4>Automatically Collected Information</h4>
            <p>
              Our servers automatically collect standard log data when you access the Site, such as your IP address, browser type, and access times. This information is used for analytical purposes to improve our service.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul>
              <li>Respond to your comments, questions, and requests and provide customer service via our contact form.</li>
              <li>Operate and maintain our AI-powered tools.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Provide and deliver the products and services you request, process transactions, and send you related information.</li>
            </ul>

            <h2>3. Disclosure of Your Information</h2>
            <p>
              We do not share, sell, rent, or trade your information with third parties for their commercial purposes. We may share information about you in the following situations:
            </p>
            <ul>
                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, and AI model hosting (such as Google AI).</li>
            </ul>
            
             <h2>4. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h2>5. Policy for Children</h2>
            <p>
              We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.
            </p>
            
            <h2>6. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us through our <a href="/contact">contact page</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
