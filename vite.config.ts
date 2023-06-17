import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { lingui } from '@lingui/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/kana-quiz/',
  plugins: [
    react(),
    tsconfigPaths(),
    lingui(),
  ],
})
