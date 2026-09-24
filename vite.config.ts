import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Browser preview of the RN app via react-native-web.
export default defineConfig({
  root: 'web',
  plugins: [react()],
  define: {
    __DEV__: JSON.stringify(true),
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
  resolve: {
    alias: { 'react-native': 'react-native-web' },
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: ['.web.js', '.web.tsx', '.js', '.tsx', '.ts'],
      loader: { '.js': 'jsx' },
    },
  },
  server: { port: 5173 },
});
