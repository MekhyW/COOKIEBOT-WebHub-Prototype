import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "build",
    minify: false,
    cssMinify: false,
    cssCodeSplit: false,
    sourcemap: true,
  },
});
