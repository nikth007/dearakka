import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base can be overridden at build time:  vite build --base=/dearakka-site/
// Default '/' suits Vercel / custom domain. For GitHub Pages project sites
// pass the repo path as base.
export default defineConfig({
  plugins: [react()],
  base: process.env.SITE_BASE || '/',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
  },
});
