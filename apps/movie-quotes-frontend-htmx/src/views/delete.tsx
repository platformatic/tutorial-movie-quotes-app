import { gql, quotesApi } from '/lib/quotes-api.js'
import { isPostRequest } from '/lib/request-utils.js'

export const path = '/delete/:id'

export const head = (
  <>
    <title>Delete movie quote</title>
  </>
)

export default async ({ req, reply }) => {
  if (isPostRequest(req)) {
    const id = Number(req.params.id)
    const { error } = await quotesApi.mutation(
      gql`
      mutation($id: ID!) {
        deleteQuotes(where: { id: { eq: $id }}) {
          id
        }
      }
    `,
      { id },
    )
    if (!error) {
      reply.redirect('/')
    }
  }
  return (
    <main>
      <h2>Delete quote</h2>
      <p class="text-lg bg-red-200 p-4">
        There was an error deleting the quote. Please try again.
      </p>
    </main>
  )
}
