import { defineConfig } from 'vite';
import reactPreset from 'vite-preset-react'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    tsconfigPaths(),
    reactPreset({ removeDevtoolsInProd: true, injectReact: true }),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
});
