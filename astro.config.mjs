// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    // tailwind(),
  ],
  output: 'server',
  server: {
    host: true, // Listen on all addresses
    port: 4321, // Use a specific port
    hmr: {
      clientPort: 4321 // Force the client to use the same port
    }
  }
});