<script>
import { isPostRequest } from '../../lib/request-utils';

export async function getData({ req, reply }) {
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
      reply.redirect('/')
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<template>
  <main>
    <h2>Delete quote</h2>
    <p class="text-lg bg-red-200 p-4">
      There was an error deleting the quote. Please try again.
    </p>
  </main>
</template>
