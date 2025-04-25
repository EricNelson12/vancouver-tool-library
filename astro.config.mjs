// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: import.meta.env.SITE_URL,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()],
});