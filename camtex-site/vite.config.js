import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build` → static site in dist/ (deploy anywhere).
// `npm run build:single` → one self-contained HTML file in dist-single/ for previews.
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: mode === 'single' ? [viteSingleFile()] : [],
  build: {
    outDir: mode === 'single' ? 'dist-single' : 'dist',
    chunkSizeWarningLimit: 1200,
    assetsInlineLimit: mode === 'single' ? 100000000 : 4096,
  },
}));
