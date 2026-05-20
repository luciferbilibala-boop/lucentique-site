import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://luciferbilibala-boop.github.io',
  base: '/lucentique-site/',
  srcDir: 'src',
  publicDir: 'public',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
