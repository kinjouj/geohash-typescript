import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: './public',
  build: {
    //minify: 'esbuild',
    minify: false,
    outDir: './build',
    emptyOutDir: false,
    copyPublicDir: true,
    lib: {
      entry: resolve(__dirname, 'src/geohash.ts'),
      name: 'GeoHash',
      formats: ['iife'],
      fileName: () => 'geohash.js',
    },
  },
});
