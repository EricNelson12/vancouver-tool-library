// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL,
  base: process.env.PUBLIC_BASE_PATH || '',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()],
});