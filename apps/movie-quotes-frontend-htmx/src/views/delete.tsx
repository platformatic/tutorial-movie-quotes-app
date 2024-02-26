import { isPostRequest } from '/lib/request-utils.js'

export const path = '/delete/:id'
export const method = ['POST']

export const head = (
  <>
    <title>Delete movie quote</title>
  </>
)

export async function preHandler(req, reply) {
  if (isPostRequest(req)) {
    const id = Number(req.params.id)
    try {
      await req.quotes.graphql({
        query: `
          mutation($id: ID!) {
            deleteQuotes(where: { id: { eq: $id }}) {
              id
            }
          }
        `,
        variables: { id },
      })
      reply.send('')
    } catch (error) {
      console.log(error)
    }
  }
}

export default ({ req, reply }) => {
  return (
    <main>
      <h2>Delete quote</h2>
      <p class="text-lg bg-red-200 p-4">
        There was an error deleting the quote. Please try again.
      </p>
    </main>
  )
}
