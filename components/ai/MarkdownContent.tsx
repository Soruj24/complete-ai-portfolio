import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  loading: () => (
    <div className="flex items-center gap-2 text-sm text-text-tertiary">
      <Loader2 className="w-3.5 h-3.5 animate-spin" />
      Rendering...
    </div>
  ),
});

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const proseClass =
  "prose prose-sm max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-ul:text-text-secondary prose-li:marker:text-accent";

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-2 text-sm text-text-tertiary">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Loading renderer...
        </div>
      }
    >
      <div className={`${proseClass} ${className}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Suspense>
  );
}
