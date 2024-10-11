<!--bati:start section="document"-->

<!--bati:start section="intro"-->

# react-google-maps-api vike example

Generated with [Bati](https://batijs.dev) ([version 295](https://www.npmjs.com/package/create-bati/v/0.0.295)) using this command:

```sh
pnpm create bati --react --tailwindcss --cloudflare --eslint --prettier --sentry
```

<!--bati:start section="TOC"-->

## Contents

- [react-google-maps-api vike example](#react-google-maps-api-vike-example)
  - [Contents](#contents)
  - [React](#react)
    - [`/pages/+config.ts`](#pagesconfigts)
    - [Routing](#routing)
    - [`/pages/_error/+Page.jsx`](#pages_errorpagejsx)
    - [`/pages/+onPageTransitionStart.ts` and `/pages/+onPageTransitionEnd.ts`](#pagesonpagetransitionstartts-and-pagesonpagetransitionendts)
    - [SSR](#ssr)
    - [HTML Streaming](#html-streaming)
  - [Sentry Browser / Error Tracking \& Performance Monitoring](#sentry-browser--error-tracking--performance-monitoring)

<!--bati:end section="TOC"-->

<!--bati:end section="intro"-->

<!--bati:start section="features"-->

<!--bati:start category="UI Framework" flag="react"-->

## React

This app is ready to start. It's powered by [Vike](https://vike.dev) and [React](https://react.dev/learn).

### `/pages/+config.ts`

Such `+` files are [the interface](https://vike.dev/config) between Vike and your code. It defines:

- A default [`<Layout>` component](https://vike.dev/Layout) (that wraps your [`<Page>` components](https://vike.dev/Page)).
- A default [`title`](https://vike.dev/title).
- Global [`<head>` tags](https://vike.dev/head-tags).

### Routing

[Vike's built-in router](https://vike.dev/routing) lets you choose between:

- [Filesystem Routing](https://vike.dev/filesystem-routing) (the URL of a page is determined based on where its `+Page.jsx` file is located on the filesystem)
- [Route Strings](https://vike.dev/route-string)
- [Route Functions](https://vike.dev/route-function)

### `/pages/_error/+Page.jsx`

The [error page](https://vike.dev/error-page) which is rendered when errors occur.

### `/pages/+onPageTransitionStart.ts` and `/pages/+onPageTransitionEnd.ts`

The [`onPageTransitionStart()` hook](https://vike.dev/onPageTransitionStart), together with [`onPageTransitionEnd()`](https://vike.dev/onPageTransitionEnd), enables you to implement page transition animations.

### SSR

SSR is enabled by default. You can [disable it](https://vike.dev/ssr) for all your pages or only for some pages.

### HTML Streaming

You can enable/disable [HTML streaming](https://vike.dev/stream) for all your pages, or only for some pages while still using it for others.

<!--bati:end category="UI Framework" flag="react"-->

<!--bati:start category="Error tracking" flag="sentry"-->

## Sentry Browser / Error Tracking & Performance Monitoring

This app is integrated with [Sentry](https://sentry.io) for error tracking.

Add your Sentry DSN to `.env` file.
You can configure [Sentry for the browser](https://docs.sentry.io/platforms/javascript/guides/react/) in `sentry.browser.config.ts`.

Upload of source maps to Sentry is handled by the [`sentryVitePlugin`](https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/vite/) in `vite.config.ts`.
You have to configure `SENTRY_ORG`, `SENTRY_PROJECT` and `SENTRY_AUTH_TOKEN` in the `.env.sentry-build-plugin` file with the values from your Sentry account.

> \[!NOTE]
> Sentry Error Tracking is **only activated in production** (`import.meta.env.PROD === true`)!

**Testing Sentry** receiving Errors:

1. Build & Start the app `pnpm build && pnpm preview`.
2. open Testpage in browser: <http://localhost:3000/sentry>.
3. check your [Sentry Dashboard](https://sentry.io) for new Errors.

<!--bati:end category="Error tracking" flag="sentry"-->

<!--bati:end section="features"-->

<!--bati:end section="document"-->
