import 'fluent-env/auto'

import FastifyFormBody from '@fastify/formbody'
import FastifyVite from '@fastify/vite'
import Fastify from 'fastify'

import quotesGraphQLClient from './src/lib/quotes/quotes.cjs'

const server = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger'
    }
  }
})

await server.register(FastifyFormBody)

await server.register(quotesGraphQLClient, {
  url: process.env.VITE_GRAPHQL_API_ENDPOINT,
})

await server.register(FastifyVite, {
  root: import.meta.url,
  renderer: '@fastify/vue',
})

await server.vite.ready()
await server.listen({ port: 3000 })
