import { defineConfig } from 'vite';
import reactPreset from 'vite-preset-react'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
  // build: {
  //   outDir: 'dist/apps/web',
  // },
  plugins: [
    tsconfigPaths(),
    reactPreset({ removeDevtoolsInProd: true, injectReact: true }),
  ],
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:3333"
  //   }
  // },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
});
