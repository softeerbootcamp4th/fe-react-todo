import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    cacheDir: './.yarn/.vite',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },
    server: { port: 3000 },
});
