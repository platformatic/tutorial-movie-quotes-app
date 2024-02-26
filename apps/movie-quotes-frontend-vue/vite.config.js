import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import viteVue from  '@vitejs/plugin-vue'
import viteFastifyVue from '@fastify/vue/plugin'

export default {
  root: join(dirname(fileURLToPath(import.meta.url)), 'src'),
  plugins: [
    viteVue(),
    viteFastifyVue()
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
}
