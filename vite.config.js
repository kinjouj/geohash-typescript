import { resolve } from "node:path"
import { defineConfig } from "vite"
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "./public/*",
          dest: "./"
        }
      ]
    })
  ],
  build: {
    //minify: "esbuild",
    minify: false,
    outDir: "./build",
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/geohash.ts'),
      name: 'GeoHash',
      formats: ['iife'],
      fileName: () => 'geohash.js',
    },
  },
});
