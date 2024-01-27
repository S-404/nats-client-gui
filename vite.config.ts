import { defineConfig } from 'vite';
import * as path from 'path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';


const aliases = {
    '#app': path.resolve(__dirname, './src/app'),
    '#renderer': path.resolve(__dirname, './src/renderer'),
    '#lib': path.resolve(__dirname, './src/lib'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
        vite: {
          resolve: {
            alias: { ...aliases },
          },
        }
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
        vite: {
          resolve: {
            alias: { ...aliases },
          },
        }
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],

});
