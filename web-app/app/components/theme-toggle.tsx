import { Moon, Sun } from 'lucide-react';
import { ComponentType, memo, useCallback, type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../contexts/theme.tsx';

function ThemeToggleF(): JSX.Element {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const onClick = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="theme-toggle"
      aria-label={
        theme === 'dark'
          ? t('common.accessibility.switchToLightMode')
          : t('common.accessibility.switchToDarkMode')
      }
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export const ThemeToggle: ComponentType = memo(ThemeToggleF);
