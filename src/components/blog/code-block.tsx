
'use client';

import { useState } from 'react';
import DOMPurify from 'dompurify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeBlockProps {
  value: {
    code: string;
    language?: string;
    filename?: string;
  };
}

export default function CodeBlock({ value }: CodeBlockProps) {
  const { code, language, filename } = value;
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    toast({
        title: "Copied to clipboard",
        description: "The code has been copied successfully.",
    });
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  if (!code) {
    return null;
  }

  // Only show syntax-highlighted code if language is specifically set to 'code' or 'syntax'
  if (language === 'code' || language === 'syntax') {
    return (
      <div className="my-6 not-prose rounded-lg border bg-secondary/50 text-sm font-code">
        {filename && (
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <p className="text-muted-foreground">{filename}</p>
          </div>
        )}
        <div className="relative p-4 overflow-x-auto">
          <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleCopy}
          >
              {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy code</span>
          </Button>
          <SyntaxHighlighter
            language={language === 'code' ? 'text' : 'text'}
            style={oneDark}
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              background: 'transparent',
              padding: 0,
              fontSize: '14px'
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }

  // Default behavior: Render all code as HTML components
  // Sanitize HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(code, {
    ALLOWED_TAGS: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'ul', 'ol', 'li', 'br', 'strong', 'em', 'b', 'i', 'u', 'blockquote', 'pre', 'code', 'table', 'tr', 'td', 'th', 'thead', 'tbody'],
    ALLOWED_ATTR: ['class', 'id', 'href', 'src', 'alt', 'title', 'target', 'rel', 'style'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|xxx):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
  
  return (
    <div 
      className="my-6 not-prose"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );

}
