import './index.client.js'
import QuoteListing from '/fragments/QuoteListing.tsx'

export const path = '/'

export const head = (
  <>
    <title>All quotes</title>
  </>
)

export default ({ req }) => {
  return <QuoteListing req={req} />
}
