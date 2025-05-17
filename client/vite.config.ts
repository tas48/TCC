import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(),
    tailwindcss()
  ],
  publicDir: 'public',
  assetsInclude: ['**/*.pdf'],
  server: {
    fs: {
      strict: false
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
