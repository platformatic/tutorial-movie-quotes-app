'use strict'

const pltClient = require('@platformatic/client')
const { join } = require('path')

async function generateQuotesClientPlugin (app, opts) {
  const url = new URL(opts.url)
  url.pathname = '/graphql'
  app.register(pltClient, {
    type: 'graphql',
    name: 'quotes',
    path: join(__dirname, 'quotes.schema.graphql'),
    url: url.toString()
  })
}

generateQuotesClientPlugin[Symbol.for('plugin-meta')] = {
  name: 'quotes GraphQL Client'
}
generateQuotesClientPlugin[Symbol.for('skip-override')] = true

module.exports = generateQuotesClientPlugin
module.exports.default = generateQuotesClientPlugin
