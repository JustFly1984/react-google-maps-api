import { pages } from "vike-cloudflare";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  plugins: [
    vike({
      prerender: {
        noExtraDir: true,
      },
    }),
    react(),
    sentryVitePlugin({
      sourcemaps: {
        disable: false,
      },
    }),
    pages(),
  ],

  build: {
    sourcemap: true,
  },
});
