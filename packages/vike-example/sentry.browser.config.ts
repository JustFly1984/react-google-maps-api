import * as Sentry from "@sentry/react";

export function sentryBrowserConfig(): void {
  if (import.meta.env.PROD === true) {
    Sentry.init({
      dsn: import.meta.env.PUBLIC_ENV__SENTRY_DSN,
      environment: "production-frontend",
      //enabled: import.meta.env.DEV ? false : true,
      integrations: [Sentry.replayIntegration()],
      autoSessionTracking: globalThis?.window?.document ? true : false, // disable autoSessionTracking in SSR
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for tracing.
      tracesSampleRate: 1.0,
      // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
      tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],
      // Capture Replay for 10% of all sessions,
      // plus for 100% of sessions with an error
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
}
