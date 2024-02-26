<script lang="ts">
import QuoteForm, { QuoteFormData } from '../../components/QuoteForm.vue';

import { getMovieId } from '../../lib/quotes-api';
import { isPostRequest, getFormData } from '../../lib/request-utils';

export function getMeta () {
  return {
    title: 'Edit movie quote'
  }
}

export async function getData ({ req, reply }) {
  const id = Number(req.params.id)
  let formValues: QuoteFormData = {}
  let loadError = false
  let saveError = false

  if (isPostRequest(req)) {
    formValues = req.body
    const movieId = await getMovieId(req, formValues.movie)

    if (movieId) {
      const quote = {
        id,
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
        variables: { id },
      })
    } catch {
      loadError = true
    }

    if (data) {
      formValues = {
        ...data,
        movie: data.movie.name,
      }
    }
  }
  return {
    id,
    formValues,
    loadError,
    saveError,
  }
}
</script>

<script lang="ts" setup>
import { useRouteContext } from '/:core.js'

const { id, saveError, loadError, formValues } = useRouteContext().data;
</script>

<template>
  <main>
    <h2>Edit quote</h2>
    <QuoteForm 
      :action="`/edit/${id}`" 
      :values="formValues" 
      :saveError="saveError"
      :loadError="loadError" 
      submitLabel="Update quote" />
  </main>
</template>
