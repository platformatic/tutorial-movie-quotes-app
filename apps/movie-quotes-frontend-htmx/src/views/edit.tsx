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
  req.movieId = Number(req.params.id)
  const formData: QuoteFormData = {}
  req.formValues = formData
  req.loadError = false
  req.saveError = false

  if (isPostRequest(req)) {
    req.formData = req.body
    req.movieId = await getMovieId(req, formData.movie)

    if (movieId) {
      const quote = {
        id: req.movieId,
        quote: formData.quote,
        saidBy: formData.saidBy,
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
      } catch (error) {
        console.log(error)
        req.saveError = true
      }
    } else {
      req.saveError = true
    }
    reply.redirect('/')
  } else {
    // biome-ignore lint/suspicious/noImplicitAnyLet: to avoid extending rewrite too much
    let data
    try {
      data = await req.quotes.graphql({
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
        variables: { id: req.movieId },
      })
    } catch {
      req.loadError = true
    }

    if (data) {
      req.formValues = {
        ...data,
        movie: data.movie.name,
      }
    }
  }
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
