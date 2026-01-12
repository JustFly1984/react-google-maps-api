import clsx from 'clsx';
import { Check } from 'lucide-react';
import { useMemo, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../utils/locale-link.tsx';

import { styles } from '../styles.ts';

const headerClasses = clsx(styles.textCenter, styles.mb16);
const titleClasses = clsx(styles.text4xl, styles.fontBold, styles.textThemePrimary);
const subtitleClasses = clsx(
  styles.mt4,
  styles.textLg,
  styles.textThemeSecondary,
  styles.maxW2xl,
  styles.mxAuto,
);
const pricingContainerClasses = clsx(styles.maxWLg, styles.mxAuto, styles.mdMaxW2xl);
const pricingCardClasses = clsx(
  styles.card,
  styles.p8,
  styles.textCenter,
  styles.relative,
  styles.overflowHidden,
);
const pricingBadgeClasses = clsx(
  styles.absolute,
  styles.top0,
  styles.right0,
  styles.bgYellow400,
  styles.textYellow900,
  styles.textSm,
  styles.fontMedium,
  styles.px3,
  styles.py1,
  styles.roundedLg,
);

const pricingTitleClasses = clsx(styles.text2xl, styles.fontBold, styles.textThemePrimary);
const pricingSubtitleClasses = clsx(styles.mt2, styles.textThemeSecondary);
const priceAmountClasses = clsx(styles.text5xl, styles.fontBold, styles.textThemePrimary);
const featuresListClasses = clsx(styles.mt8, styles.spaceY4, styles.textLeft);
const featureItemClasses = clsx(styles.flex, styles.itemsCenter, styles.gap3);
const featureIconClasses = clsx(styles.iconMd, styles.textGreen500, styles.shrink0);
const featureTextClasses = styles.textThemeSecondary;
const buttonClasses = clsx(styles.mt8, styles.wFull, styles.btnPrimary, styles.py3, styles.block);
const guaranteeClasses = clsx(styles.mt4, styles.textSm, styles.textThemeTertiary);
const openSourceSectionClasses = clsx(styles.mt16, styles.textCenter);
const openSourceTitleClasses = clsx(
  styles.textXl,
  styles.fontSemibold,
  styles.textThemePrimary,
  styles.mb4,
);
const openSourceDescClasses = clsx(styles.textThemeSecondary, styles.maxW2xl, styles.mxAuto);

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
    <div className={styles.py20}>
      <div className={styles.containerMaxW7xl}>
        <div className={headerClasses}>
          <h1 className={titleClasses}>{t('pricing.title')}</h1>
          <p className={subtitleClasses}>{t('pricing.subtitle')}</p>
        </div>

        <div className={pricingContainerClasses}>
          <div className={pricingCardClasses}>
            <div className={pricingBadgeClasses} />
            <h2 className={pricingTitleClasses}>{t('pricing.license.name')}</h2>
            <p className={pricingSubtitleClasses}>{t('pricing.license.subtitle')}</p>

            <div className={styles.mt6}>
              <span className={priceAmountClasses}>{t('pricing.license.price')}</span>
              <span className={styles.textGray600}>{t('pricing.license.period')}</span>
            </div>

            <ul className={featuresListClasses}>
              {features.map((feature) => (
                <li key={feature} className={featureItemClasses}>
                  <Check className={featureIconClasses} />
                  <span className={featureTextClasses}>{feature}</span>
                </li>
              ))}
            </ul>

            <LocaleLink to="/signup" className={buttonClasses}>
              {t('pricing.license.buttonText')}
            </LocaleLink>

            <p className={guaranteeClasses}>{t('pricing.license.guarantee')}</p>
          </div>
        </div>

        <div className={openSourceSectionClasses}>
          <h3 className={openSourceTitleClasses}>{t('pricing.openSource.title')}</h3>
          <p className={openSourceDescClasses}>{t('pricing.openSource.description')}</p>
        </div>
      </div>
    </div>
  );
}
