import vue from '@vitejs/plugin-vue'
import path from 'path'
/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  alias: {
    '@': path.resolve(__dirname, '/src'),
  },
  server: {
    port: 4200,
  },
}
