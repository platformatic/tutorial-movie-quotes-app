export function isPostRequest (request) {
  return request.method === 'POST'
}

export async function getFormData (request) {
  const formData = await request.formData()

  return Object.fromEntries(formData.entries())
}
