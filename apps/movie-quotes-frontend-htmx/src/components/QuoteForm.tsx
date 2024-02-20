import Html from '@kitajs/html'
import { gql, quotesApi } from '/lib/quotes-api.js'

export interface Props extends Html.PropsWithChildren {
  action: string
  values?: QuoteFormData
  saveError?: boolean
  loadError?: boolean
  submitLabel: string
}

export interface QuoteFormData {
  id?: number
  quote?: string
  saidBy?: string
  movie?: string
}

export default async ({
  req,
  action,
  values = {},
  saveError,
  loadError,
  submitLabel,
}: Props) => {
  const movies = await req.quotes.graphql({
    query: `
      query {
        movies {
          name
        }
      }
    `,
  })

  return (
    <>
      {saveError && (
        <p class="text-lg bg-red-200 p-4">
          There was an error saving the quote. Please try again.
        </p>
      )}
      {loadError && (
        <p class="text-lg bg-red-200 p-4">
          There was an error loading the quote. Please try again.
        </p>
      )}
      <form method="post" action={action} class="grid grid-cols-1 gap-6">
        <label for="quote" class="block">
          <span>Quote</span>
          <textarea
            id="quote"
            name="quote"
            required="required"
            class="mt-1 w-full"
          >
            {values.quote}
          </textarea>
        </label>
        <label for="said-by" class="block">
          <span>Said by</span>
          <input
            type="text"
            id="said-by"
            name="saidBy"
            required="required"
            value={values.saidBy}
            class="mt-1 w-full"
          />
        </label>
        <label for="movie" class="block">
          <span>Movie</span>
          <input
            list="movies"
            id="movie"
            name="movie"
            required="required"
            autocomplete="off"
            value={values.movie}
            class="form-input mt-1 w-full"
          />
        </label>
        <input
          type="submit"
          value={submitLabel}
          disabled={loadError && 'disabled'}
          class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 round p-3"
        />
      </form>
    </>
  )
}
