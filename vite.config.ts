import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@common/assets": path.resolve(__dirname, "/src/common/assets"),
      "@common/components": path.resolve(__dirname, "./src/common/components"),
      "@common/hooks": path.resolve(__dirname, "./src/common/hooks"),
      "@common/icons": path.resolve(__dirname, "./src/common/icons"),
      "@common/styles": path.resolve(__dirname, "./src/common/styles"),
      "@pages/cats/common/components": path.resolve(
        __dirname,
        "./src/pages/cats/common/components"
      ),
      "@pages/cats/common/hooks": path.resolve(
        __dirname,
        "./src/pages/cats/common/hooks"
      ),
      "@pages/cats/common/styles": path.resolve(
        __dirname,
        "./src/pages/cats/common/styles"
      ),
    },
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
});
