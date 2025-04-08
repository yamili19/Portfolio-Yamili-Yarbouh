import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    babel: {
      parserOpts: {
        plugins: ['jsx']
      }
    }
  })],
  optimizeDeps: {
    include: [
      '@babel/core',
      '@babel/parser',
      '@babel/preset-react'
    ]
  }
});