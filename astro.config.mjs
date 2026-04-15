import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jerohalili.github.io',
  base: '/',
  // This ensures your projects become /projects/name/index.html
  build: {
    format: 'directory'
  },
  // Ensure trailing slashes are handled consistently
  trailingSlash: 'always',
  integrations: [tailwind()],
});