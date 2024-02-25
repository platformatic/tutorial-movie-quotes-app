import { useRouteContext } from '/:core.jsx'

import QuoteActionEdit from '/components/QuoteActionEdit.tsx'
import QuoteActionDelete from '/components/QuoteActionDelete.tsx'
import QuoteActionLike from '/components/QuoteActionLike.tsx'

export async function getData ({ req }) {
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

  return {
    quotes,
    page: `listing-${sort}`,
  }
}

export function getMeta () {
  return {
    title: 'All quotes'
  }
}

export default () => {
  console.log('pages/index.tsx')
  const { page, quotes } = useRouteContext().data
  return (
    <main>
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <div key={`quote-${quote.id}`} className="border-b mb-6 quote">
            <blockquote className="text-2xl mb-0">
              <p className="mb-4">{quote.quote}</p>
            </blockquote>
            <p className="text-xl mt-0 mb-8 text-gray-400">
              — {quote.saidBy}, {quote.movie?.name}
            </p>
            <div className="flex flex-col mb-6 text-gray-400">
              <span className="flex items-center">
                <QuoteActionLike id={quote.id} likes={quote.likes} />
                <QuoteActionEdit id={quote.id} />
                <QuoteActionDelete id={quote.id} />
              </span>
              <span className="mt-4 text-gray-400 italic">
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
