import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import viteReact from  '@vitejs/plugin-react'
import viteFastifyReact from '@fastify/react/plugin'

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
