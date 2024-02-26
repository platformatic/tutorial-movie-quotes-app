import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import viteFastifyReact from '@fastify/react/plugin'
import viteReact from '@vitejs/plugin-react'

export default {
  root: join(dirname(fileURLToPath(import.meta.url)), 'src'),
  plugins: [viteReact(), viteFastifyReact()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
}
