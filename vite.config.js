import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Set the base URL for the app
  build: {
    // Adjust the output directory if needed
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, // Ensure the server responds with index.html for all routes
  },
});
