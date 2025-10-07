// vite.config.ts
// Non-strict Vite config for temporary relaxed builds

// @ts-nocheck
import { defineConfig } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';

// Export config
export default defineConfig({
  plugins: [react()],
  esbuild: {
    logLevel: 'silent', // hides warnings
  },
  build: {
    sourcemap: false,
    outDir: 'dist',
  },
  server: {
    port: 5173,
  },
});
