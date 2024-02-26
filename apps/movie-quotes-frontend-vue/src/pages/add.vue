<script lang="ts">
import QuoteForm from '../components/QuoteForm.vue';
import type { QuoteFormData } from '../components/QuoteForm.vue';

import { getMovieId } from '../lib/quotes-api';
import { isPostRequest } from '../lib/request-utils';

export async function getData ({ req, reply }) {
  let formData: QuoteFormData = {}
  let saveError = false

  if (isPostRequest(req)) {
    formData = req.body
    const movieId = await getMovieId(req, formData.movie)

    if (!movieId) {
      saveError = true
    }
    const quote = {
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
      console.error(error)
      saveError = true
    }
    if (!saveError) {
      return reply.redirect('/')
    }
  }
  return {
    saveError,
    formData,
    page: 'add',
  }
}
</script>

<script lang="ts" setup>
import { useRouteContext } from '/:core.js'

const { saveError, formData } = useRouteContext().data
</script>

<template>
  <main>
    <h2>Add a quote</h2>
    <QuoteForm 
      action="/add" 
      :values="formData"
      :saveError="saveError"
      submitLabel="Add quote" />
  </main>
</template>
