import clsx from 'clsx';
import { Copy } from 'lucide-react';
import { useCallback, useEffect, useState, type JSX } from 'react';
import { createHighlighter } from 'shiki';

import { styles } from '../styles.ts';
import './code-highlight.css';

type Props = {
  code: string;
  language: string;
  theme?: string;
};

const fallbackCodeClasses = clsx(
  styles.bgGray900,
  'text-gray-100',
  styles.p4,
  styles.roundedLg,
  styles.overflowXAuto,
);
const loadingContainerClasses = clsx(
  styles.bgGray900,
  'text-gray-100',
  styles.p4,
  styles.roundedLg,
  styles.overflowXAuto,
);
const containerClasses = clsx(styles.relative, styles.group);
const codeContainerClasses = clsx(styles.roundedLg, styles.overflowXAuto);
const copyButtonClasses = clsx(
  styles.absolute,
  styles.top2,
  styles.right2,
  styles.p2,
  styles.bgGray800,
  'text-gray-300',
  styles.roundedMd,
  styles.opacity0,
  styles.groupHoverOpacity100,
  styles.transitionOpacity,
  styles.hoverBgGray700,
);

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
        setHighlightedCode(`<pre class="${fallbackCodeClasses}"><code>${code}</code></pre>`);
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
      <div className={loadingContainerClasses}>
        <pre className={styles.textSm}>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className={codeContainerClasses} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      <button
        onClick={handleCopy}
        className={copyButtonClasses}
        title={copied ? 'Copied!' : 'Copy code'}
      >
        <Copy className={styles.iconSm} />
      </button>
    </div>
  );
}
