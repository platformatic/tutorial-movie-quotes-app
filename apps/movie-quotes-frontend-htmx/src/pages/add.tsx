import QuoteForm from '/components/QuoteForm.tsx'
import type { QuoteFormData } from '/components/QuoteForm.tsx'

import { gql, quotesApi } from '/lib/quotes-api'
import { getFormData, isPostRequest } from '/lib/request-utils'

export const path = '/add'

export const head = (
  <>
    <title>Add a movie quote</title>
  </>
)

export default async ({ req, reply }) => {
  let formData: QuoteFormData = {}
  let saveError = false

  if (isPostRequest(req)) {
    formData = await getFormData(req)

    const movieId = await quotesApi.getMovieId(formData.movie)

    if (movieId) {
      const quote = {
        quote: formData.quote,
        saidBy: formData.saidBy,
        movieId,
      }

      const { error } = await quotesApi.mutation(
        gql`
        mutation($quote: QuoteInput!) {
          saveQuote(input: $quote) {
            id
          }
        }
      `,
        { quote },
      )

      if (!error) {
        return reply.redirect('/')
      }
      saveError = true
    } else {
      saveError = true
    }
  }
  req.page = 'Add'
  return (
    <main>
      <h2>Add a quote</h2>
      <QuoteForm
        action="/add"
        values={formData}
        saveError={saveError}
        submitLabel="Add quote"
      />
    </main>
  )
}
