import 'fluent-env/auto'

import FastifyFormBody from '@fastify/formbody'
import FastifyVite from '@fastify/vite'
import Fastify from 'fastify'

import quotesGraphQLClient from './src/lib/quotes/quotes.cjs'

const server = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
})

await server.register(FastifyFormBody)

console.log(process.env.VITE_GRAPHQL_API_ENDPOINT)

await server.register(quotesGraphQLClient, {
  url: process.env.VITE_GRAPHQL_API_ENDPOINT,
})

server.post('/api/like-movie-quote/:id', async (req, reply) => {
  const id = Number(req.params.id)
  const liked = await req.quotes.graphql({
    query: `
      mutation($id: ID!) {
        likeQuote(id: $id)
      }
    `,
    variables: { id },
  })
  reply.type('text/plain')
  reply.send(liked)
})

await server.register(FastifyVite, {
  root: import.meta.url,
  renderer: '@fastify/htmx',
})

await server.vite.ready()
await server.listen({ port: 3000 })
