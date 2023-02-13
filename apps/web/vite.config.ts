import { defineConfig, loadEnv } from 'vite';
import reactPreset from 'vite-preset-react'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig(({ mode }: any) => {
  const env = loadEnv(mode, process.cwd())

  return ({
    base: mode === 'production' ? env.VITE_BASE_URL : '/',
    plugins: [
      tsconfigPaths(),
      reactPreset({ removeDevtoolsInProd: true, injectReact: true }),
    ],

    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    }
  })
});
