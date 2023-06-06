import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind()]
  // server: {
  //   port: 3000,
  //   host: '127.0.0.1'
  // }
})
