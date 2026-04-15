import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jerohalili.github.io',
  base: '/jerohalili.github.io',
  // base: '/',
  integrations: [tailwind()],
});