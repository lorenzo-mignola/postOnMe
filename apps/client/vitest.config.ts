import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  // @ts-expect-error
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
