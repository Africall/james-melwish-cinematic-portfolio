import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages serves the site under /<repo>/
  base: '/james-melwish-cinematic-portfolio/',
  plugins: [react(), tailwindcss()],
});
