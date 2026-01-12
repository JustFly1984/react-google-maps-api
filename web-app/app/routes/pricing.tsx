import clsx from 'clsx';
import { Check, Shield, Sparkles, Zap } from 'lucide-react';
import { useMemo, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../utils/locale-link.tsx';

import { styles } from '../styles.ts';

const pageClasses = clsx(
  styles.py20,
  'bg-gradient-to-b from-transparent via-blue-50/30 to-transparent',
  'dark:from-transparent dark:via-blue-950/20 dark:to-transparent',
);
const headerClasses = clsx(styles.textCenter, styles.mb16);
const titleClasses = clsx(
  styles.text4xl,
  'md:text-5xl',
  styles.fontBold,
  styles.textThemePrimary,
  'tracking-tight',
);
const subtitleClasses = clsx(
  styles.mt4,
  styles.textLg,
  'md:text-xl',
  styles.textThemeSecondary,
  styles.maxW2xl,
  styles.mxAuto,
);

const pricingContainerClasses = clsx('max-w-md', styles.mxAuto);
const pricingCardClasses = clsx(
  'relative',
  'rounded-2xl',
  'border-2 border-blue-500/50 dark:border-blue-400/50',
  'bg-theme-surface',
  'shadow-xl shadow-blue-500/10 dark:shadow-blue-400/10',
  'transform hover:scale-[1.02] transition-transform duration-300',
);
const cardGlowClasses = clsx(
  'absolute inset-0 -z-10',
  'bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20',
  'dark:from-blue-400/10 dark:to-purple-400/10',
  'blur-xl',
);
const cardContentClasses = clsx('p-8 md:p-10');
const popularBadgeClasses = clsx(
  'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'px-4 py-1.5',
  'bg-gradient-to-r from-blue-600 to-purple-600',
  'text-white text-sm font-semibold',
  'rounded-full',
  'shadow-lg',
);

const iconContainerClasses = clsx(
  'w-14 h-14 mx-auto mb-6',
  'rounded-xl',
  'bg-gradient-to-br from-blue-500 to-purple-600',
  'flex items-center justify-center',
  'shadow-lg shadow-blue-500/30',
);
const iconClasses = clsx('w-7 h-7 text-white');

const pricingTitleClasses = clsx('text-2xl md:text-3xl', styles.fontBold, styles.textThemePrimary);
const pricingSubtitleClasses = clsx(styles.mt2, styles.textThemeSecondary);

const priceContainerClasses = clsx('mt-8 mb-8');
const priceAmountClasses = clsx(
  'text-6xl md:text-7xl',
  styles.fontBold,
  'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400',
  'bg-clip-text text-transparent',
);
const pricePeriodClasses = clsx('text-lg', styles.textThemeSecondary, 'ml-1');

const featuresListClasses = clsx('space-y-4', styles.textLeft, 'mb-8');
const featureItemClasses = clsx(
  styles.flex,
  styles.itemsCenter,
  styles.gap3,
  'p-3 rounded-lg',
  'bg-theme-secondary/50',
  'transition-colors hover:bg-theme-tertiary/50',
);
const featureIconContainerClasses = clsx(
  'w-6 h-6 rounded-full',
  'bg-green-500/20 dark:bg-green-400/20',
  'flex items-center justify-center',
  'shrink-0',
);
const featureIconClasses = clsx('w-4 h-4', 'text-theme-success');
const featureTextClasses = clsx(styles.textThemeSecondary, 'font-medium');

const buttonClasses = clsx(
  styles.wFull,
  'py-4 px-6',
  'text-lg font-semibold',
  'rounded-xl',
  'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
  'text-white',
  'shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
  'transform hover:-translate-y-0.5',
  'transition-all duration-200',
  'block text-center',
);
const guaranteeContainerClasses = clsx(
  'mt-6 flex items-center justify-center gap-2',
  styles.textThemeTertiary,
);
const guaranteeIconClasses = clsx('w-4 h-4');

const openSourceSectionClasses = clsx(
  styles.mt16,
  'p-8 rounded-2xl',
  'bg-theme-surface',
  'border border-theme',
  styles.textCenter,
  'max-w-2xl mx-auto',
);
const openSourceIconClasses = clsx('w-12 h-12 mx-auto mb-4', 'text-theme-accent');
const openSourceTitleClasses = clsx(
  styles.textXl,
  styles.fontSemibold,
  styles.textThemePrimary,
  styles.mb4,
);
const openSourceDescClasses = clsx(styles.textThemeSecondary);

export default function PricingPage(): JSX.Element {
  const { t } = useTranslation();
  const features = useMemo(() => {
    return [
      t('pricing.license.features.fullAccess'),
      t('pricing.license.features.commercialUse'),
      t('pricing.license.features.prioritySupport'),
      t('pricing.license.features.premiumExamples'),
      t('pricing.license.features.oneYearUpdates'),
      t('pricing.license.features.unlimitedProjects'),
    ];
  }, []);

  return (
    <div className={pageClasses}>
      <div className={styles.containerMaxW7xl}>
        <div className={headerClasses}>
          <h1 className={titleClasses}>{t('pricing.title')}</h1>
          <p className={subtitleClasses}>{t('pricing.subtitle')}</p>
        </div>

        <div className={pricingContainerClasses}>
          <div className={pricingCardClasses}>
            <div className={cardGlowClasses} />
            <div className={popularBadgeClasses}>
              <Sparkles className="w-4 h-4 inline mr-1.5" />
              Most Popular
            </div>

            <div className={cardContentClasses}>
              <div className={iconContainerClasses}>
                <Zap className={iconClasses} />
              </div>

              <h2 className={pricingTitleClasses}>{t('pricing.license.name')}</h2>
              <p className={pricingSubtitleClasses}>{t('pricing.license.subtitle')}</p>

              <div className={priceContainerClasses}>
                <span className={priceAmountClasses}>{t('pricing.license.price')}</span>
                <span className={pricePeriodClasses}>{t('pricing.license.period')}</span>
              </div>

              <ul className={featuresListClasses}>
                {features.map((feature) => (
                  <li key={feature} className={featureItemClasses}>
                    <div className={featureIconContainerClasses}>
                      <Check className={featureIconClasses} />
                    </div>
                    <span className={featureTextClasses}>{feature}</span>
                  </li>
                ))}
              </ul>

              <LocaleLink to="/signup" className={buttonClasses}>
                {t('pricing.license.buttonText')}
              </LocaleLink>

              <div className={guaranteeContainerClasses}>
                <Shield className={guaranteeIconClasses} />
                <span className="text-sm">{t('pricing.license.guarantee')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={openSourceSectionClasses}>
          <Sparkles className={openSourceIconClasses} />
          <h3 className={openSourceTitleClasses}>{t('pricing.openSource.title')}</h3>
          <p className={openSourceDescClasses}>{t('pricing.openSource.description')}</p>
        </div>
      </div>
    </div>
  );
}
