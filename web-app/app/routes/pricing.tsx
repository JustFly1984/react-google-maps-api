import clsx from 'clsx';
import { Check } from 'lucide-react';
import type { JSX } from 'react';
import { Link } from 'react-router';

import { styles } from '../styles.ts';

const features = [
  'Full access to all components',
  'Commercial use license',
  'Priority email support',
  'Access to premium examples',
  'One year of updates',
  'Unlimited projects',
];

const headerClasses = clsx(styles.textCenter, styles.mb16);
const titleClasses = clsx(styles.text4xl, styles.fontBold, styles.textGray900);
const subtitleClasses = clsx(
  styles.mt4,
  styles.textLg,
  styles.textGray600,
  styles.maxW2xl,
  styles.mxAuto,
);
const pricingContainerClasses = clsx(styles.maxWLg, styles.mxAuto);
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

const pricingTitleClasses = clsx(styles.text2xl, styles.fontBold, styles.textGray900);
const pricingSubtitleClasses = clsx(styles.mt2, styles.textGray600);
const priceAmountClasses = clsx(styles.text5xl, styles.fontBold, styles.textGray900);
const featuresListClasses = clsx(styles.mt8, styles.spaceY4, styles.textLeft);
const featureItemClasses = clsx(styles.flex, styles.itemsCenter, styles.gap3);
const featureIconClasses = clsx(styles.iconMd, styles.textGreen500, styles.shrink0);
const featureTextClasses = styles.textGray700;
const buttonClasses = clsx(styles.mt8, styles.wFull, styles.btnPrimary, styles.py3, styles.block);
const guaranteeClasses = clsx(styles.mt4, styles.textSm, styles.textGray500);
const openSourceSectionClasses = clsx(styles.mt16, styles.textCenter);
const openSourceTitleClasses = clsx(
  styles.textXl,
  styles.fontSemibold,
  styles.textGray900,
  styles.mb4,
);
const openSourceDescClasses = clsx(styles.textGray600, styles.maxW2xl, styles.mxAuto);

export default function PricingPage(): JSX.Element {
  return (
    <div className={styles.py20}>
      <div className={styles.containerMaxW7xl}>
        <div className={headerClasses}>
          <h1 className={titleClasses}>Simple, Transparent Pricing</h1>
          <p className={subtitleClasses}>
            Get a commercial license to use React Google Maps API in your production applications.
          </p>
        </div>

        <div className={pricingContainerClasses}>
          <div className={pricingCardClasses}>
            <div className={pricingBadgeClasses} />
            <h2 className={pricingTitleClasses}>Commercial License</h2>
            <p className={pricingSubtitleClasses}>Perfect for production apps</p>

            <div className={styles.mt6}>
              <span className={priceAmountClasses}>$12</span>
              <span className={styles.textGray600}>/year</span>
            </div>

            <ul className={featuresListClasses}>
              {features.map((feature) => (
                <li key={feature} className={featureItemClasses}>
                  <Check className={featureIconClasses} />
                  <span className={featureTextClasses}>{feature}</span>
                </li>
              ))}
            </ul>

            <Link to="/signup" className={buttonClasses}>
              Get Started
            </Link>

            <p className={guaranteeClasses}>30-day money-back guarantee</p>
          </div>
        </div>

        <div className={openSourceSectionClasses}>
          <h3 className={openSourceTitleClasses}>Open Source Usage</h3>
          <p className={openSourceDescClasses}>
            React Google Maps API is free for open source projects. If you're building something for
            the community, you can use it without a license.
          </p>
        </div>
      </div>
    </div>
  );
}
