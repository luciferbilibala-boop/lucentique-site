import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://luciferbilibala-boop.github.io/lucentique-site',
  base: '/lucentique-site/',
  srcDir: 'src',
  publicDir: 'public',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
