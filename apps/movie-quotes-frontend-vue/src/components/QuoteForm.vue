<script lang="ts">
export function getData ({ req }) {
  return req.quotes.graphql({
    query: `
      query {
        movies {
          name
        }
      }
    `,
  })
}
</script>

<script lang="ts" setup>
import { useRouteContext } from '/:core.js'

export interface QuoteFormData {
  id?: string
  quote?: string
  saidBy?: string
  movie?: string
}

const props = defineProps<{
  action: string
  values?: QuoteFormData
  saveError?: boolean
  loadError?: boolean
  submitLabel: string
}>()

const { movies } = useRouteContext().data 
</script>

<template>
  <p v-if="saveError" text-lg bg-red-200 p-4>
    There was an error saving the quote. Please try again.
  </p>
  <p v-else-if="loadError" text-lg bg-red-200 p-4>
    There was an error loading the quote. Please try again.
  </p>
  <form method="post" :action="action" class="grid grid-cols-1 gap-6">
    <label for="quote" class="block">
      <span>Quote</span>
      <textarea 
        id="quote" 
        name="quote" 
        required="required" 
        class="mt-1 w-full">{{ values.quote }}</textarea>
    </label>
    <label for="said-by" class="block">
      <span>Said by</span>
      <input 
        type="text" 
        id="said-by" 
        name="saidBy" 
        required="required" 
        :value="values.saidBy" 
        class="mt-1 w-full">
    </label>
    <label for="movie" class="block">
      <span>Movie</span>
      <input 
        list="movies" 
        id="movie" 
        name="movie" 
        required="required" 
        autocomplete="off" 
        :value="values.movie"
        class="form-input mt-1 w-full">
        <datalist id="movies">
          <option v-for="{ name } in movies">{{ name }}</option>
      </datalist>
    </label>
    <input 
      type="submit" 
      :value="submitLabel"
      :disabled="loadError && 'disabled'"
      class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 round p-3" />
  </form>
</template>