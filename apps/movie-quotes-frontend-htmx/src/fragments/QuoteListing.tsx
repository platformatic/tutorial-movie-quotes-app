import QuoteActionDelete from '/components/QuoteActionDelete.tsx'
import QuoteActionEdit from '/components/QuoteActionEdit.tsx'
import QuoteActionLike from '/components/QuoteActionLike.tsx'

export const path = '/html/quotes'
export const fragment = true

export default async ({ req }) => {
  const allowedSortFields = ['createdAt', 'likes']
  const searchParamSort = req.query.sort
  const sort = allowedSortFields.includes(searchParamSort)
    ? searchParamSort
    : 'createdAt'

  const quotes = await req.quotes.graphql({
    query: `
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
    `,
  })

  req.page = `listing-${sort}`

  return (
    <main>
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <div class="border-b mb-6" class="quote">
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
                Added {new Date(quote.createdAt).toUTCString()}
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
