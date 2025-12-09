// file: src/components/MarkdownContent.tsx
"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { resolveDeepLinks } from "@/lib/capsules/loader";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  // Resolve [[slug]] deep-links to actual Markdown links
  const resolvedContent = resolveDeepLinks(content);

  return (
    <div className={`prose ${className}`}>
      <ReactMarkdown
        components={{
          // Custom link renderer to use Next.js Link for internal links
          a: ({ href, children }) => {
            if (href?.startsWith("/")) {
              return (
                <Link href={href} className="text-winter-blue hover:text-winter-teal">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-winter-blue hover:text-winter-teal"
              >
                {children}
              </a>
            );
          },
          // Custom heading renderers
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-cloud-dark">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-6 mb-3 text-cloud-dark">
              {children}
            </h3>
          ),
          // Custom list renderer
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
          ),
          // Custom paragraph renderer
          p: ({ children }) => <p className="mb-4 text-cloud-dark">{children}</p>,
        }}
      >
        {resolvedContent}
      </ReactMarkdown>
    </div>
  );
}
