import { getEmailTexts } from './email-translations.ts';

const FROM_EMAIL = 'React Google Maps API <noreply@react-google-maps-api.ospm.app>';
const RESEND_API_URL = 'https://api.resend.com/emails';

type EmailResult = { success: true } | { success: false; error: string };

async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  html: string,
): Promise<EmailResult> {
  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to send email:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: String(error) };
  }
}

const emailStyles = {
  container:
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;',
  header: 'text-align: center; margin-bottom: 32px;',
  logo: 'font-size: 24px; font-weight: bold; color: #2563eb;',
  title: 'color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 16px 0;',
  text: 'color: #4b5563; font-size: 16px; line-height: 24px; margin: 0 0 16px 0;',
  button:
    'display: inline-block; background: linear-gradient(to right, #2563eb, #7c3aed); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 24px 0;',
  codeBox:
    'background-color: #f3f4f6; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 14px; color: #1f2937; margin: 16px 0; word-break: break-all;',
  footer:
    'color: #9ca3af; font-size: 14px; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;',
  link: 'color: #2563eb; text-decoration: none;',
  highlight: 'color: #2563eb; font-weight: 600;',
};

function emailTemplate(content: string, copyrightText: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb;">
      <div style="${emailStyles.container}">
        <div style="${emailStyles.header}">
          <div style="${emailStyles.logo}">🗺️ React Google Maps API</div>
        </div>
        ${content}
        <div style="${emailStyles.footer}">
          <p style="margin: 0;">${copyrightText.replace('{year}', String(new Date().getFullYear()))}</p>
          <p style="margin: 8px 0 0 0;">
            <a href="https://react-google-maps-api.ospm.app" style="${emailStyles.link}">react-google-maps-api.ospm.app</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendWelcomeEmail(
  apiKey: string,
  to: string,
  fullName: string | null,
  appUrl: string,
  locale: string = 'en',
): Promise<EmailResult> {
  const t = getEmailTexts(locale);
  const greeting = fullName
    ? t.welcome.greetingName.replace('{name}', fullName)
    : t.welcome.greeting;

  const html = emailTemplate(
    `
    <h1 style="${emailStyles.title}">${greeting}</h1>
    <p style="${emailStyles.text}">${t.welcome.body}</p>
    <ul style="${emailStyles.text}">
      ${t.welcome.items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
    <a href="${appUrl}/docs" style="${emailStyles.button}">${t.welcome.cta}</a>
    <p style="${emailStyles.text}">${t.welcome.footer}</p>
  `,
    t.common.copyright,
  );

  return sendEmail(apiKey, to, t.welcome.subject, html);
}

export async function sendPasswordResetEmail(
  apiKey: string,
  to: string,
  resetLink: string,
  locale: string = 'en',
): Promise<EmailResult> {
  const t = getEmailTexts(locale);

  const html = emailTemplate(
    `
    <h1 style="${emailStyles.title}">${t.passwordReset.title}</h1>
    <p style="${emailStyles.text}">${t.passwordReset.body}</p>
    <p style="${emailStyles.text}"><strong>${t.passwordReset.expires}</strong></p>
    <a href="${resetLink}" style="${emailStyles.button}">${t.passwordReset.cta}</a>
    <p style="${emailStyles.text}">${t.passwordReset.ignore}</p>
    <p style="color: #6b7280; font-size: 14px;">
      ${t.passwordReset.copyLink}<br />
      <a href="${resetLink}" style="${emailStyles.link}">${resetLink}</a>
    </p>
  `,
    t.common.copyright,
  );

  return sendEmail(apiKey, to, t.passwordReset.subject, html);
}

export async function sendPasswordChangedEmail(
  apiKey: string,
  to: string,
  appUrl: string,
  locale: string = 'en',
): Promise<EmailResult> {
  const t = getEmailTexts(locale);

  const html = emailTemplate(
    `
    <h1 style="${emailStyles.title}">${t.passwordChanged.title}</h1>
    <p style="${emailStyles.text}">${t.passwordChanged.body}</p>
    <p style="${emailStyles.text}">${t.passwordChanged.ifYou}</p>
    <p style="${emailStyles.text}">${t.passwordChanged.ifNot}</p>
    <a href="${appUrl}/forgot-password" style="${emailStyles.button}">${t.passwordChanged.cta}</a>
  `,
    t.common.copyright,
  );

  return sendEmail(apiKey, to, t.passwordChanged.subject, html);
}

export async function sendPurchaseConfirmationEmail(
  apiKey: string,
  to: string,
  licenseKey: string,
  expiryDate: string,
  appUrl: string,
  locale: string = 'en',
): Promise<EmailResult> {
  const t = getEmailTexts(locale);
  const dateLocale = locale === 'zh-CN' ? 'zh-CN' : locale === 'zh-TW' ? 'zh-TW' : locale;
  const formattedExpiry = new Date(expiryDate).toLocaleDateString(dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = emailTemplate(
    `
    <h1 style="${emailStyles.title}">${t.purchase.title}</h1>
    <p style="${emailStyles.text}">${t.purchase.body}</p>
    <p style="${emailStyles.text}"><strong>${t.purchase.licenseKey}</strong></p>
    <div style="${emailStyles.codeBox}">${licenseKey}</div>
    <p style="${emailStyles.text}">
      <strong>${t.purchase.validUntil}</strong> <span style="${emailStyles.highlight}">${formattedExpiry}</span>
    </p>
    <p style="${emailStyles.text}">${t.purchase.includes}</p>
    <ul style="${emailStyles.text}">
      ${t.purchase.items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
    <a href="${appUrl}/dashboard" style="${emailStyles.button}">${t.purchase.cta}</a>
    <p style="${emailStyles.text}">${t.purchase.keepEmail}</p>
  `,
    t.common.copyright,
  );

  return sendEmail(apiKey, to, t.purchase.subject, html);
}
