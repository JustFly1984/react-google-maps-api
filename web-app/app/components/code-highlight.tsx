import { Copy } from 'lucide-react';
import { useCallback, useEffect, useState, type JSX } from 'react';
import { createHighlighter } from 'shiki';
import './code-highlight.css';

type Props = {
  code: string;
  language: string;
  theme?: string;
};

export function CodeHighlight({ code, language, theme = 'github-dark' }: Props): JSX.Element {
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function highlightCode() {
      try {
        const highlighter = await createHighlighter({
          themes: [theme],
          langs: [language, 'tsx', 'typescript', 'javascript', 'json', 'bash', 'css'],
        });

        if (!mounted) return;

        const lines = code.split('\n');
        const codeWithLines = lines
          .map((line, i) => `${String(i + 1).padStart(2, ' ')}  ${line}`)
          .join('\n');

        const html = highlighter.codeToHtml(codeWithLines, {
          lang: language,
          theme,
        });

        setHighlightedCode(html);
      } catch (error: unknown) {
        console.error('Failed to highlight code:', error);
        // Fallback to plain code
        setHighlightedCode(
          `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>${code}</code></pre>`,
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    highlightCode();

    return () => {
      mounted = false;
    };
  }, [code, language, theme]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [code]);

  if (loading) {
    return (
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div
        className="rounded-lg overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-800 text-gray-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
        title={copied ? 'Copied!' : 'Copy code'}
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}
