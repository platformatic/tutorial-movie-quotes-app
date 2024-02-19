import { confirmDeleteQuote, likeQuote } from '/scripts/quote-actions.js'

addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[form-delete-quote]').forEach((deleteForm) => {
    deleteForm.addEventListener('submit', (event) => {
      event.preventDefault()
      confirmDeleteQuote(event.currentTarget)
    })
  })

  document.querySelectorAll('[data-like-quote]').forEach((container) => {
    container.addEventListener('click', (event) => likeQuote(event.currentTarget), { once: true })
  })
})
