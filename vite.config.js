import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function inlineCssPlugin() {
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, { bundle }) {
        if (!bundle) return html
        return html.replace(
          /<link\s+rel="stylesheet"[^>]*href="\/([^"]+\.css)"[^>]*>/g,
          (match, fileName) => {
            const asset = bundle[fileName]
            if (asset && asset.type === 'asset') {
              delete bundle[fileName]
              return `<style>${asset.source}</style>`
            }
            return match
          },
        )
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCssPlugin()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
})