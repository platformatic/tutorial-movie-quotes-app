'use strict'

const S = require('fluent-json-schema')

module.exports = async function plugin (app) {
  app.log.info('plugin loaded')

  async function incrementQuoteLikes (id) {
    const { db, sql } = app.platformatic

    const result = await db.query(sql`
      UPDATE quotes SET likes = likes + 1 WHERE id=${id} RETURNING likes
    `)

    return result[0]?.likes
  }

  // This JSON Schema will validate the request path parameters.
  // It reuses part of the schema that Platormatic DB has
  // automatically generated for our Quote entity.
  const schema = {
    params: S.object().prop('id', app.getSchema('Quote').properties.id)
  }

  app.post('/quotes/:id/like', { schema }, async function (request, response) {
    return { likes: await incrementQuoteLikes(request.params.id) }
  })
}
