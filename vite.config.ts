import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://mrdoker1.github.io/only-apps-test/ on GitHub Pages.
export default defineConfig({
  base: '/only-apps-test/',
  plugins: [react()],
});
