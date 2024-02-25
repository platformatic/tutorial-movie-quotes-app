import { useRouteContext } from '/:core.jsx'

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

export interface QuoteFormData {
  id?: string
  quote?: string
  saidBy?: string
  movie?: string
}

interface Props {
  action: string
  values?: QuoteFormData
  saveError?: boolean
  loadError?: boolean
  submitLabel: string
}

export default ({ values, action, loadError, saveError }: Props) => {
  const { movies } = useRouteContext().data 
  return (
    <>
      {saveError && (
        <p className="text-lg bg-red-200 p-4">
          There was an error saving the quote. Please try again.
        </p>
      )}
      {loadError && (
        <p className="text-lg bg-red-200 p-4">
          There was an error loading the quote. Please try again.
        </p>
      )}
      <form method="post" action={action} className="grid grid-cols-1 gap-6">
        <label for="quote" className="block">
          <span>Quote</span>
          <textarea
            id="quote"
            name="quote"
            required="required"
            className="mt-1 w-full"
          >
            {values.quote}
          </textarea>
        </label>
        <label for="said-by" className="block">
          <span>Said by</span>
          <input
            type="text"
            id="said-by"
            name="saidBy"
            required="required"
            value={values.saidBy}
            className="mt-1 w-full"
          />
        </label>
        <label for="movie" className="block">
          <span>Movie</span>
          <input
            list="movies"
            id="movie"
            name="movie"
            required="required"
            autocomplete="off"
            value={values.movie}
            className="form-input mt-1 w-full"
          />
        </label>
        <input
          type="submit"
          value={submitLabel}
          disabled={loadError && 'disabled'}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 round p-3"
        />
      </form>
    </>
  )
}
