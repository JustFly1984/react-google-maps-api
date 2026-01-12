import { Moon, Sun } from 'lucide-react';
import { ComponentType, memo, useCallback, type JSX } from 'react';

import { useTheme } from '../contexts/theme.tsx';

function ThemeToggleF(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  console.info('ThemeToggle', theme);

  const onClick = useCallback(() => {
    console.log('ThemeToggle clicked');
    toggleTheme();
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export const ThemeToggle: ComponentType = memo(ThemeToggleF);
