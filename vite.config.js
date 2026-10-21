import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    rollupOptions: {
      input: Object.fromEntries(['','rooms','facilities','gallery','about','contact'].map(page=>[page||'home',resolve(page ? `${page}/index.html` : 'index.html')])),
    },
  },
  test: { environment: 'jsdom', setupFiles: ['./src/test/setup.js'], css: false },
});
