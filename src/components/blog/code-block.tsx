'use client'

import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
// Languages must be imported to be available to Prism

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const highlightAndSanitize = async () => {
      if (codeRef.current) {
        // Dynamically import dompurify only on the client side
        const DOMPurify = (await import('dompurify')).default;
        
        // Sanitize the code
        const sanitizedCode = DOMPurify.sanitize(code);

        // Find the grammar for the specified language
        const grammar = Prism.languages[language];

        if (grammar) {
          // Highlight the sanitized code
          const highlightedCode = Prism.highlight(sanitizedCode, grammar, language);
          codeRef.current.innerHTML = highlightedCode;
        } else {
          // If language is not supported, just display the sanitized code
          codeRef.current.textContent = sanitizedCode;
        }
      }
    };

    highlightAndSanitize();
  }, [code, language]);

  // Render the raw code on the server and initial client render.
  // The useEffect will then asynchronously highlight and sanitize it on the client.
  return (
    <pre className={`language-${language} not-prose`}>
      <code ref={codeRef}>
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock;
