import { defineConfig, InlineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: "./.yarn/.vite",
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: { port: 3000 },
} as VitestConfigExport);
