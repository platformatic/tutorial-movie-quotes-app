import QuoteForm from '/components/QuoteForm.tsx'
import type { QuoteFormData } from '/components/QuoteForm.tsx'

import { getMovieId } from '/lib/quotes-api'
import { isPostRequest } from '/lib/request-utils'

export const path = '/add'
export const method = ['GET', 'POST']

export const head = (
  <>
    <title>Add a movie quote</title>
  </>
)

export async function preHandler (req, reply) {
  const formData: QuoteFormData = {}
  req.formData = formData
  req.saveError = false

  if (isPostRequest(req)) {
    req.formData = req.body
    const movieId = await getMovieId(req, req.formData.movie)

    if (!movieId) {
      req.saveError = true
    }
    const quote = {
      quote: req.formData.quote,
      saidBy: req.formData.saidBy,
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
      console.error(error)
      req.saveError = true
    }
  }
  if (!req.saveError) {
    return reply.redirect('/')
  }
  req.page = 'add'
}

export default async ({ req, reply }) => {
  return (
    <main>
      <h2>Add a quote</h2>
      <QuoteForm
        req={req}
        action="/add"
        values={req.formData}
        saveError={req.saveError}
        submitLabel="Add quote"
      />
    </main>
  )
}
