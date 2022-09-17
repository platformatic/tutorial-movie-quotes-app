import { quotesApi, gql } from '../lib/quotes-api.js'

export function confirmDeleteQuote (form) {
  if (confirm('Are you sure want to delete this quote?')) {
    form.submit()
  }
}

export async function likeQuote (likeQuote) {
  likeQuote.classList.add('liked')
  likeQuote.classList.remove('cursor-pointer')

  const id = Number(likeQuote.dataset.quoteId)

  const { data } = await quotesApi.mutation(gql`
    mutation($id: ID!) {
      likeQuote(id: $id)
    }
  `, { id })

  if (data?.likeQuote) {
    likeQuote.querySelector('.likes-count').innerText = data.likeQuote
  }
}
