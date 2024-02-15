import './index.client.js'

import QuoteListing from '/fragments/QuoteActionListing.tsx'
import { gql, quotesApi } from '/lib/quotes-api'

export const path = '/'

export const head = (
  <>
    <title>All quotes</title>
  </>
)

export default ({ req }) => {
  return <QuoteListing req={req} />
}
