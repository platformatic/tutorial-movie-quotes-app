import { createClient } from '@urql/core'

const graphqlClient = createClient({
  url: import.meta.env.PUBLIC_GRAPHQL_API_ENDPOINT,
  requestPolicy: 'network-only'
})

async function graphqlClientWrapper (method, gqlQuery, queryVariables = {}) {
  const queryResult = await graphqlClient[method](
    gqlQuery,
    queryVariables
  ).toPromise()

  if (queryResult.error) {
    console.error('GraphQL error:', queryResult.error)
  }

  return {
    data: queryResult.data,
    error: queryResult.error
  }
}

export const quotesApi = {
  async query (gqlQuery, queryVariables = {}) {
    return await graphqlClientWrapper('query', gqlQuery, queryVariables)
  },
  async mutation (gqlQuery, queryVariables = {}) {
    return await graphqlClientWrapper('mutation', gqlQuery, queryVariables)
  }
}

export { gql } from '@urql/core'
