import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Pins the Vercel server output for self-deploys; Lovable's own builds override this.
  nitro: { preset: "vercel" },
});
