import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Custom domain serves from the root, not the github.io/dentalClinic/ subpath.
  base: '/',
});
