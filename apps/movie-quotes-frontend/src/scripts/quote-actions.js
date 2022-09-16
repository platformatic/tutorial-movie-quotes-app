export function confirmDeleteQuote (form) {
  if (confirm('Are you sure want to delete this quote?')) {
    form.submit()
  }
}
