import QuoteForm, { QuoteFormData } from '/components/QuoteForm.tsx'

import { getMovieId } from '/lib/quotes-api.js'
import { isPostRequest } from '/lib/request-utils.js'

export const path = '/edit/:id'
export const method = ['GET', 'POST']

export const head = (
  <>
    <title>Edit movie quote</title>
  </>
)

export const decorateRequest = [
  'formValues',
  'loadError',
  'saveError',
  'quoteId',
]

export async function preHandler(req, reply) {
  const id = Number(req.params.id)
  let formValues: QuoteFormData = {}
  let loadError = false
  let saveError = false

  if (isPostRequest(req)) {
    formValues = req.body
    const movieId = await getMovieId(req, formValues.movie)

    if (movieId) {
      const quote = {
        id: req.movieId,
        quote: formValues.quote,
        saidBy: formValues.saidBy,
        movieId,
      }

      try {
        await req.quotes.graphql({
          query: `
            mutation($quote: QuoteInput!) {
              saveQuote(input: $quote) {
                id
              }
            }
          `,
          variables: { quote },
        })
        reply.redirect('/')
      } catch (error) {
        console.log(error)
        saveError = true
      }
    } else {
      saveError = true
    }
  } else {
    // biome-ignore lint/suspicious/noImplicitAnyLet: to avoid extending rewrite too much
    let quote
    try {
      quote = await req.quotes.graphql({
        query: `
          query($id: ID!) {
            getQuoteById(id: $id) {
              id
              quote
              saidBy
              movie {
                id
                name
              }
            }
          }
        `,
        variables: { id },
      })
    } catch {
      loadError = true
    }

    if (quote) {
      formValues = {
        ...quote,
        movie: quote.movie.name,
      }
    }
  }

  req.formValues = formValues
  req.loadError = loadError
  req.saveError = saveError
}

export default async ({ req, reply }) => {
  return (
    <main>
      <h2>Edit quote</h2>
      <QuoteForm
        req={req}
        action={`/edit/${req.quoteId}`}
        values={req.formValues}
        saveError={req.saveError}
        loadError={req.loadError}
        submitLabel="Update quote"
      />
    </main>
  )
}
