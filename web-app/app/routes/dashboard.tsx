import clsx from 'clsx';
import { Calendar, Check, Copy, Key, ShoppingCart } from 'lucide-react';
import { type JSX, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import * as v from 'valibot';
import { LocaleLink } from '../utils/locale-link.tsx';

import { CheckoutResponseSchema, LicensesResponseSchema } from '../../shared/schemas.ts';
import { useAuth } from '../contexts/auth.tsx';
import { styles } from '../styles.ts';

const YEARLY_LICENSE_PRICE_ID = import.meta.env.VITE_STRIPE_PRICE_ID;

type License = {
  id: string;
  serialNumber: string;
  purchaseDate: string;
  expiryDate: string;
  isActive: boolean;
};

const loadingContainerClasses = clsx(
  styles.minH80vh,
  styles.flex,
  styles.itemsCenter,
  styles.justifyCenter,
);
const spinnerClasses = clsx(
  styles.animateSpin,
  styles.roundedFull,
  styles.h12,
  styles.w12,
  styles.borderB2,
  styles.borderAccent,
);
const containerClasses = clsx(
  styles.container,
  styles.maxW7xl,
  styles.px4,
  styles.smPx6,
  styles.lgPx8,
);
const titleClasses = clsx(styles.text3xl, styles.fontBold, styles.textThemePrimary);
const subtitleClasses = clsx(styles.mt2, styles.textThemeSecondary);
const gridClasses = clsx(
  styles.grid,
  styles.gridCols1,
  styles.mdGridCols2,
  styles.lgGridCols3,
  styles.gap8,
);
const cardHeaderClasses = clsx(styles.p6, styles.borderB, styles.borderTheme);
const cardTitleClasses = clsx(styles.textLg, styles.fontSemibold, styles.textThemePrimary);
const loadingSpinnerClasses = clsx(styles.flex, styles.justifyCenter, styles.py8);
const smallSpinnerClasses = clsx(
  styles.animateSpin,
  styles.roundedFull,
  styles.h8,
  styles.w8,
  styles.borderB2,
  styles.borderAccent,
);
const emptyStateClasses = clsx(styles.textCenter, styles.py8);
const iconClasses = clsx(styles.mxAuto, styles.h12, styles.w12, styles.textThemeTertiary);
const emptyTitleClasses = clsx(
  styles.mt4,
  styles.textLg,
  styles.fontMedium,
  styles.textThemePrimary,
);
const emptyTextClasses = clsx(styles.mt2, styles.textThemeSecondary);
const purchaseButtonClasses = clsx(styles.mt6, styles.btnPrimary);
const cartIconClasses = clsx(styles.mr2, styles.h4, styles.w4);
const licenseCardClasses = clsx(styles.p4, styles.border, styles.borderTheme, styles.roundedLg);
const licenseHeaderClasses = clsx(styles.flex, styles.itemsStart, styles.justifyBetween);
const licenseInfoClasses = clsx(styles.flex, styles.itemsCenter, styles.gap2);
const keyIconClasses = clsx(styles.h5, styles.w5, styles.textThemeAccent);
const serialNumberClasses = clsx(styles.fontMono, styles.fontMedium);
const copyButtonClasses = clsx(styles.p1, styles.hoverBgGray100, styles.rounded);
const checkIconClasses = clsx(styles.h4, styles.w4, styles.textSuccess);
const copyIconClasses = clsx(styles.h4, styles.w4, styles.textThemeTertiary);
const licenseMetaClasses = clsx(
  styles.mt2,
  styles.flex,
  styles.itemsCenter,
  styles.gap4,
  styles.textSm,
  styles.textThemeSecondary,
);
const calendarClasses = clsx(
  styles.flex,
  styles.itemsCenter,
  styles.gap2,
  styles.textSm,
  styles.textThemeSecondary,
);
const calendarIconClasses = clsx(styles.h4, styles.w4);
const sidebarCardClasses = clsx(styles.card, styles.p6);
const sidebarTitleClasses = clsx(styles.fontSemibold, styles.textThemePrimary, styles.mb4);
const licenseBadgeClasses = clsx(
  styles.px2,
  styles.py1,
  styles.textXs,
  styles.fontMedium,
  styles.roundedLg,
);
const licenseBadgeActiveClasses = clsx(licenseBadgeClasses, styles.badgeSuccess);
const licenseBadgeInactiveClasses = clsx(licenseBadgeClasses, styles.badgeError);
const sidebarButtonClasses = clsx(styles.wFull, styles.btnPrimary);
const docsLinkClasses = clsx(styles.wFull, styles.btnSecondary, styles.block, styles.textCenter);
const purchaseIconClasses = clsx(styles.mr2, styles.h4, styles.w4);

export default function DashboardPage(): JSX.Element {
  const { t, i18n } = useTranslation();
  const { user, loading: authLoading } = useAuth();

  const navigate = useNavigate();

  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user === null) {
      navigate(i18n.language === 'en' ? '/login' : `/${i18n.language}/login`);
    }
  }, [user, authLoading, navigate, i18n.language]);

  useEffect(() => {
    if (user) {
      fetchLicenses();
    }
  }, [user]);

  const fetchLicenses = async () => {
    try {
      const response = await fetch('/api/licenses', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();

        const result = v.safeParse(LicensesResponseSchema, data);

        if (result.success) {
          setLicenses(result.output.licenses);
        }
      }
    } catch (error: unknown) {
      console.error('Error fetching licenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = useCallback(async () => {
    if (user === null) {
      return;
    }

    setPurchaseLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: YEARLY_LICENSE_PRICE_ID }),
      });

      const data = await response.json();

      const result = v.safeParse(CheckoutResponseSchema, data);

      if (result.success) {
        window.location.href = `https://checkout.stripe.com/pay/${result.output.sessionId}`;
      }
    } catch (error: unknown) {
      console.error('Error creating checkout session:', error);
    } finally {
      setPurchaseLoading(false);
    }
  }, [user]);

  const copyToClipboard = useCallback((text: string): void => {
    navigator.clipboard.writeText(text);

    setCopied(text);

    window.setTimeout((): void => {
      setCopied(null);
    }, 2000);
  }, []);

  if (authLoading || !user) {
    return (
      <div className={loadingContainerClasses}>
        <div className={spinnerClasses} />
      </div>
    );
  }

  return (
    <div className={styles.py12}>
      <div className={containerClasses}>
        <div className={styles.mb8}>
          <h1 className={titleClasses}>{t('dashboard.title')}</h1>
          <p className={subtitleClasses}>{t('dashboard.subtitle')}</p>
        </div>

        <div className={gridClasses}>
          <div className={styles.lgColSpan2}>
            <div className={styles.card}>
              <div className={cardHeaderClasses}>
                <h2 className={cardTitleClasses}>{t('dashboard.licenses.title')}</h2>
              </div>
              <div className={styles.p6}>
                {loading ? (
                  <div className={loadingSpinnerClasses}>
                    <div className={smallSpinnerClasses} />
                  </div>
                ) : licenses.length === 0 ? (
                  <div className={emptyStateClasses}>
                    <Key className={iconClasses} />
                    <h3 className={emptyTitleClasses}>{t('dashboard.licenses.empty.title')}</h3>
                    <p className={emptyTextClasses}>{t('dashboard.licenses.empty.description')}</p>
                    <button
                      type="button"
                      onClick={handlePurchase}
                      disabled={purchaseLoading}
                      className={purchaseButtonClasses}
                    >
                      <ShoppingCart className={cartIconClasses} />
                      {purchaseLoading
                        ? t('dashboard.sidebar.processing')
                        : t('dashboard.licenses.empty.button')}
                    </button>
                  </div>
                ) : (
                  <div className={styles.spaceY4}>
                    {licenses.map((license) => (
                      <div key={license.id} className={licenseCardClasses}>
                        <div className={licenseHeaderClasses}>
                          <div>
                            <div className={licenseInfoClasses}>
                              <Key className={keyIconClasses} />
                              <span className={serialNumberClasses}>{license.serialNumber}</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(license.serialNumber)}
                                className={copyButtonClasses}
                              >
                                {copied === license.serialNumber ? (
                                  <Check className={checkIconClasses} />
                                ) : (
                                  <Copy className={copyIconClasses} />
                                )}
                              </button>
                            </div>
                            <div className={licenseMetaClasses}>
                              <span className={calendarClasses}>
                                <Calendar className={calendarIconClasses} />
                                {t('dashboard.licenses.expiryDate')}:{' '}
                                {new Date(license.expiryDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span
                            className={
                              license.isActive
                                ? licenseBadgeActiveClasses
                                : licenseBadgeInactiveClasses
                            }
                          >
                            {license.isActive
                              ? t('dashboard.licenses.status.active')
                              : t('dashboard.licenses.status.inactive')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className={sidebarCardClasses}>
              <h3 className={sidebarTitleClasses}>{t('dashboard.sidebar.title')}</h3>
              <div className={styles.spaceY3}>
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={purchaseLoading}
                  className={sidebarButtonClasses}
                >
                  <ShoppingCart className={purchaseIconClasses} />
                  {purchaseLoading
                    ? t('dashboard.sidebar.processing')
                    : t('dashboard.sidebar.purchaseLicense')}
                </button>
                <LocaleLink to="/docs" className={docsLinkClasses}>
                  {t('dashboard.sidebar.viewDocs')}
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
