import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      allow: [__dirname, '../oxc/npm/oxc-wasm'],
    },
  },
})
