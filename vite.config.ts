import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }), 
      react(), 
      tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: '/geopulse-dev/',
    test: {
      globals: true,
      css: {
        include: /\.css$/
      },
      deps: {
        inline: ['@esri/calcite-components']
      },
      environment: 'jsdom',
    }
  }
})