import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jerohalili.is-a.dev',
  base: '/',
  integrations: [tailwind()],
});