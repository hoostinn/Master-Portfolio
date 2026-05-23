import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://justinjpark.dev',
  integrations: [tailwind()],
  output: 'static',
});
