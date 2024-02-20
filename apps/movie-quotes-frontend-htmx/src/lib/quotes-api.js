export async function getMovieId(req, inputMovieName) {
  const movieName = inputMovieName.trim()

  let movieId = null

  // Check if a movie already exists with the provided name.
  let movies
  try {
    movies = await req.quotes.graphql({
      query: `
        query ($movieName: String!) {
          movies(where: { name: { eq: $movieName } }) {
            id
          }
        }
      `,
      variables: { movieName },
    })
  } catch (error) {
    console.log(error)
    return null
  }

  console.log({ movies })

  const movieExists = movies.length === 1
  if (movieExists) {
    movieId = movies[0].id
  } else {
    // Create a new movie entity record.
    try {
      const saveMovieResult = await req.quotes.graphql({
        query: `
          mutation ($movieName: String!) {
            saveMovie(input: { name: $movieName }) {
              id
            }
          }
        `,
        variables: { movieName },
      })
      movieId = saveMovieResult.id
    } catch (error) {
      console.error(error)
    }
  }

  return movieId
}
