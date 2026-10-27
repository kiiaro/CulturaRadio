import { cpSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: resolve(projectRoot, "mostra-cultural-2026"),
  publicDir: false,
  plugins: [
    {
      name: "copy-site-assets",
      apply: "build",
      closeBundle() {
        cpSync(
          resolve(projectRoot, "mostra-cultural-2026/assets"),
          resolve(projectRoot, "dist/assets"),
          { recursive: true },
        );
      },
    },
  ],
  build: {
    outDir: resolve(projectRoot, "dist"),
    emptyOutDir: true,
  },
});