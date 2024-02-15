import QuoteForm, { QuoteFormData } from '../../components/QuoteForm.tsx'

import { gql, quotesApi } from '../../lib/quotes-api'
import { getFormData, isPostRequest } from '../../lib/request-utils'

export const path = '/edit/:id'

export const head = (
  <>
    <title>Edit movie quote</title>
  </>
)

export default async ({ req, reply }) => {
  const id = Number(req.params.id)

  let formValues: QuoteFormData = {}
  let loadError = false
  let saveError = false

  if (isPostRequest(req)) {
    const formData = await getFormData(req)
    formValues = formData

    const movieId = await quotesApi.getMovieId(formData.movie)

    if (movieId) {
      const quote = {
        id,
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
  } else {
    const { data } = await quotesApi.query(
      gql`
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
      { id },
    )

    if (data?.getQuoteById) {
      formValues = {
        ...data.getQuoteById,
        movie: data.getQuoteById.movie.name,
      }
    } else {
      loadError = true
    }
  }
  return (
    <main>
      <h2>Edit quote</h2>
      <QuoteForm
        action={`/edit/${id}`}
        values={formValues}
        saveError={saveError}
        loadError={loadError}
        submitLabel="Update quote"
      />
    </main>
  )
}
