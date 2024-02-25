import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import viteVue from  '@vitejs/plugin-react'
import viteFastifyVue from '@fastify/react/plugin'

export default {
  root: join(dirname(fileURLToPath(import.meta.url)), 'src'),
  plugins: [
    viteReact(),
    viteFastifyReact()
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
}
