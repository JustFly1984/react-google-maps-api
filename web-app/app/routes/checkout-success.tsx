import clsx from 'clsx';
import { Check, CheckCircle, Copy, Key } from 'lucide-react';
import type { JSX } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import * as v from 'valibot';

import { LicenseResponseSchema } from '../../shared/schemas.ts';
import { styles } from '../styles.ts';

type License = {
  id: string;
  serialNumber: string;
  purchaseDate: string;
  expiryDate: string;
  isActive: boolean;
};

const containerClasses = clsx(styles.pageMaxW, styles.textCenter);
const successIconClasses = clsx(styles.iconXl, styles.textGreen600);
const successTitleClasses = clsx(
  styles.text2xl,
  styles.fontBold,
  styles.textThemePrimary,
  styles.mb2,
);
const successTextClasses = clsx(styles.textThemeSecondary, styles.mb6);
const licenseKeyContainerClasses = clsx(
  styles.flex,
  styles.itemsCenter,
  styles.gap2,
  styles.bgThemeTertiary,
  styles.p3,
  styles.roundedLg,
);
const loadingContainerClasses = clsx(
  styles.minH80vh,
  styles.flex,
  styles.itemsCenter,
  styles.justifyCenter,
);
const copyButtonClasses = clsx(
  styles.p2,
  styles.hoverBgGray200,
  styles.rounded,
  styles.transitionColors,
);
const copyIconClasses = clsx(styles.iconSm, styles.textThemeTertiary);
const licenseCodeClasses = clsx(styles.flex1, styles.fontMono, styles.textSm, styles.fontMedium);
const licenseValidityClasses = clsx(styles.textXs, styles.textThemeTertiary, styles.mt2);
const successIconContainerClasses = clsx(
  styles.inlineFlex,
  styles.itemsCenter,
  styles.justifyCenter,
  styles.w16,
  styles.h16,
  styles.roundedFull,
  styles.bgGreen100,
  styles.mb6,
);
const licenseCardClasses = clsx(styles.card, styles.p6, styles.mb8, styles.textLeft);
const licenseHeaderClasses = clsx(
  styles.flex,
  styles.itemsCenter,
  styles.gap2,
  styles.textSm,
  styles.textThemeSecondary,
  styles.mb2,
);
const actionsContainerClasses = clsx(
  styles.flex,
  styles.flexCol,
  styles.smFlexRow,
  styles.gap4,
  styles.justifyCenter,
);

export default function CheckoutSuccessPage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId === null) {
      setLoading(false);
    } else {
      fetchLicense();
    }
  }, [sessionId]);

  const fetchLicense = useCallback(async () => {
    try {
      const response = await fetch(`/api/licenses/by-session/${sessionId}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();

        const result = v.safeParse(LicenseResponseSchema, data);

        if (result.success) {
          setLicense(result.output.license);
        }
      }
    } catch (error: unknown) {
      console.error('Error fetching license:', error);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const copyToClipboard = useCallback((): void => {
    if (license !== null) {
      navigator.clipboard.writeText(license.serialNumber);

      setCopied(true);

      window.setTimeout((): void => {
        setCopied(false);
      }, 2000);
    }
  }, [license]);

  if (loading) {
    return (
      <div className={loadingContainerClasses}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={containerClasses}>
        <div className={successIconContainerClasses}>
          <CheckCircle className={successIconClasses} />
        </div>

        <h1 className={successTitleClasses}>Payment Successful!</h1>
        <p className={successTextClasses}>
          Thank you for your purchase. Your license is now active.
        </p>

        {license && (
          <div className={licenseCardClasses}>
            <div className={licenseHeaderClasses}>
              <Key className={styles.iconSm} />
              License Key
            </div>
            <div className={licenseKeyContainerClasses}>
              <code className={licenseCodeClasses}>{license.serialNumber}</code>
              <button onClick={copyToClipboard} className={copyButtonClasses}>
                {copied ? (
                  <Check className={successIconClasses} />
                ) : (
                  <Copy className={copyIconClasses} />
                )}
              </button>
            </div>
            <p className={licenseValidityClasses}>
              Valid until {new Date(license.expiryDate).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className={actionsContainerClasses}>
          <Link to="/dashboard" className={styles.btnPrimary}>
            Go to Dashboard
          </Link>
          <Link to="/docs" className={styles.btnSecondary}>
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
