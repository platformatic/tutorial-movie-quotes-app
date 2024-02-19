import { cacheExchange, createClient, fetchExchange, gql } from '@urql/core'

const graphqlClient = createClient({
  url: import.meta.env.VITE_GRAPHQL_API_ENDPOINT,
  requestPolicy: 'network-only',
  exchanges: [cacheExchange, fetchExchange],
})

async function graphqlClientWrapper(method, gqlQuery, queryVariables = {}) {
  const queryResult = await graphqlClient[method](
    gqlQuery,
    queryVariables,
  ).toPromise()

  if (queryResult.error) {
    console.error('GraphQL error:', queryResult.error)
  }

  return {
    data: queryResult.data,
    error: queryResult.error,
  }
}

async function getMovieId(inputMovieName) {
  const movieName = inputMovieName.trim()

  let movieId = null

  // Check if a movie already exists with the provided name.
  const queryMoviesResult = await quotesApi.query(
    gql`
      query ($movieName: String!) {
        movies(where: { name: { eq: $movieName } }) {
          id
        }
      }
    `,
    { movieName },
  )

  if (queryMoviesResult.error) {
    return null
  }

  const movieExists = queryMoviesResult.data?.movies.length === 1
  if (movieExists) {
    movieId = queryMoviesResult.data.movies[0].id
  } else {
    // Create a new movie entity record.
    const saveMovieResult = await quotesApi.mutation(
      gql`
        mutation ($movieName: String!) {
          saveMovie(input: { name: $movieName }) {
            id
          }
        }
      `,
      { movieName },
    )

    if (saveMovieResult.error) {
      return null
    }

    movieId = saveMovieResult.data?.saveMovie.id
  }

  return movieId
}

export const quotesApi = {
  async query(gqlQuery, queryVariables = {}) {
    return await graphqlClientWrapper('query', gqlQuery, queryVariables)
  },
  async mutation(gqlQuery, queryVariables = {}) {
    return await graphqlClientWrapper('mutation', gqlQuery, queryVariables)
  },
  getMovieId,
}

export { gql } from '@urql/core'
