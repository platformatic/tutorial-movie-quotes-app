import Html from '@kitajs/html'

export const path = '/html/quotes'
export const fragment = true

export default async ({ req }) => {
  const allowedSortFields = ['createdAt', 'likes']
  const searchParamSort = req.query.sort
  const sort = allowedSortFields.includes(searchParamSort)
    ? searchParamSort
    : 'createdAt'

  const { data } = await quotesApi.query(gql`
    query {
      quotes(orderBy: {field: ${sort}, direction: DESC}) {
        id
        quote
        saidBy
        likes
        createdAt
        movie {
          id
          name
        }
      }
    }
  `)

  const quotes = data?.quotes || []
  req.page = `listing-${sort}`

  return (
    <main>
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <div class="border-b mb-6">
            <blockquote class="text-2xl mb-0">
              <p class="mb-4">{quote.quote}</p>
            </blockquote>
            <p class="text-xl mt-0 mb-8 text-gray-400">
              — {quote.saidBy}, {quote.movie?.name}
            </p>
            <div class="flex flex-col mb-6 text-gray-400">
              <span class="flex items-center">
                <QuoteActionLike id={quote.id} likes={quote.likes} />
                <QuoteActionEdit id={quote.id} />
                <QuoteActionDelete id={quote.id} />
              </span>
              <span class="mt-4 text-gray-400 italic">
                Added {new Date(Number(quote.createdAt)).toUTCString()}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No movie quotes have been added.</p>
      )}
    </main>
  )
}
