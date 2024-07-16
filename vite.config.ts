import { defineConfig, InlineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: './.yarn/.vite',
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  server: { port: 3000 },
} as VitestConfigExport);
