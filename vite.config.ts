import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
          "@app": path.resolve(__dirname, "src/app"),
          "@shared": path.resolve(__dirname, "src/shared"),
          "@widgets": path.resolve(__dirname, "src/widgets"),
        },
    },
});