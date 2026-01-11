import clsx from 'clsx';
import { ArrowRight, Code, Map, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router';

import type { JSX } from 'react';
import { styles } from '../styles.ts';

const features = [
  {
    name: 'Easy Integration',
    description: 'Drop-in React components for Google Maps with full TypeScript support.',
    icon: Code,
  },
  {
    name: 'High Performance',
    description: 'Optimized for performance with lazy loading and efficient re-renders.',
    icon: Zap,
  },
  {
    name: 'Commercial License',
    description: 'Affordable yearly license for commercial use with priority support.',
    icon: Shield,
  },
];

const heroBadgeClasses = clsx(
  styles.inlineFlex,
  styles.itemsCenter,
  styles.gap2,
  styles.px4,
  styles.py2,
  styles.roundedFull,
  styles.bgBlue100,
  styles.textBlue700,
  styles.textSm,
  styles.fontMedium,
  styles.mb8,
);
const heroTitleClasses = clsx(
  styles.text4xl,
  styles.fontBold,
  styles.textThemePrimary,
  styles.trackingTight,
);
const heroSubtitleClasses = clsx(styles.mt6, styles.textXl, styles.textThemeSecondary);
const heroActionsClasses = clsx(
  styles.mt10,
  styles.flex,
  styles.flexCol,
  styles.smFlexRow,
  styles.gap4,
  styles.justifyCenter,
);
const getStartedButtonClasses = clsx(styles.btnPrimary, styles.textBase, styles.px8, styles.py3);
const pricingButtonClasses = clsx(styles.btnSecondary, styles.textBase, styles.px8, styles.py3);
const arrowIconClasses = clsx(styles.ml2, styles.iconMd);
const featuresSectionClasses = clsx(styles.py20, styles.bgThemeSurface);
const heroContainerClasses = styles.containerMaxW7xl;
const featuresContainerClasses = styles.containerMaxW7xl;
const featuresHeaderClasses = clsx(styles.textCenter, styles.mb16);
const featuresTitleClasses = clsx(styles.text3xl, styles.fontBold, styles.textThemePrimary);
const featuresSubtitleClasses = clsx(
  styles.mt4,
  styles.textCenter,
  styles.textXl,
  styles.textThemeSecondary,
);
const featuresGridClasses = clsx(
  styles.mt12,
  styles.grid,
  styles.gridCols1,
  styles.mdGridCols2,
  styles.gap8,
  styles.lgGridCols3,
);
const featureCardClasses = clsx(styles.p6);
const featureIconClasses = clsx(styles.h12, styles.w12, styles.textBlue600);
const featureNameClasses = clsx(
  styles.textLg,
  styles.fontSemibold,
  styles.textThemePrimary,
  styles.mb2,
);
const featureDescClasses = styles.textThemeSecondary;
const featureIconContainerClasses = clsx(
  styles.inlineFlex,
  styles.itemsCenter,
  styles.justifyCenter,
  styles.w12,
  styles.h12,
  styles.roundedLg,
  styles.bgBlue100,
  styles.textBlue600,
  styles.mb4,
);
const ctaSectionClasses = clsx(styles.py24, styles.bgThemeSurface);
const ctaCardClasses = clsx(styles.card, styles.p8, styles.mdP12, styles.textCenter);
const ctaTitleClasses = clsx(styles.text3xl, styles.fontBold, styles.textThemePrimary, styles.mb4);
const ctaDescClasses = clsx(
  styles.textLg,
  styles.textThemeSecondary,
  styles.mb8,
  styles.maxW2xl,
  styles.mxAuto,
);
const ctaActionsClasses = clsx(
  styles.flex,
  styles.flexCol,
  styles.smFlexRow,
  styles.gap4,
  styles.justifyCenter,
);
const ctaPrimaryButtonClasses = clsx(styles.btnPrimary, styles.textBase, styles.px8, styles.py3);
const ctaSecondaryButtonClasses = clsx(
  styles.btnSecondary,
  styles.textBase,
  styles.px8,
  styles.py3,
);

export default function HomePage(): JSX.Element {
  return (
    <div>
      <section className={styles.heroSection}>
        <div className={heroContainerClasses}>
          <div className={styles.textCenter}>
            <div className={heroBadgeClasses}>
              <Map className={styles.iconSm} />
              React Google Maps API
            </div>
            <h1 className={heroTitleClasses}>
              Google Maps for <span className={styles.textBlue600}>React</span>
            </h1>
            <p className={heroSubtitleClasses}>
              The most popular React library for Google Maps. Build beautiful, interactive maps with
              ease using our comprehensive component library.
            </p>
            <div className={heroActionsClasses}>
              <Link to="/docs" className={getStartedButtonClasses}>
                Get Started
                <ArrowRight className={arrowIconClasses} />
              </Link>
              <Link to="/pricing" className={pricingButtonClasses}>
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={featuresSectionClasses}>
        <div className={featuresContainerClasses}>
          <div className={featuresHeaderClasses}>
            <h2 className={featuresTitleClasses}>Why Choose React Google Maps API?</h2>
            <p className={featuresSubtitleClasses}>
              Built for modern React applications with developer experience in mind.
            </p>
          </div>
          <div className={featuresGridClasses}>
            {features.map((feature) => (
              <div key={feature.name} className={featureCardClasses}>
                <div className={featureIconContainerClasses}>
                  <feature.icon className={featureIconClasses} />
                </div>
                <h3 className={featureNameClasses}>{feature.name}</h3>
                <p className={featureDescClasses}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={ctaSectionClasses}>
        <div className={featuresContainerClasses}>
          <div className={ctaCardClasses}>
            <h2 className={ctaTitleClasses}>Ready to Get Started?</h2>
            <p className={ctaDescClasses}>
              Start building beautiful maps today with our comprehensive documentation and examples.
            </p>
            <div className={ctaActionsClasses}>
              <Link to="/signup" className={ctaPrimaryButtonClasses}>
                Create Account
              </Link>
              <Link to="/docs" className={ctaSecondaryButtonClasses}>
                Read Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
