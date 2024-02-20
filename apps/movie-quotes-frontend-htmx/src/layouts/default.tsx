import { Suspense } from '@kitajs/html/suspense.js'
import { ErrorBoundary } from '@kitajs/html/error-boundary.js'

const navActiveClasses = 'font-bold bg-yellow-400 no-underline'

export default ({ req, children }) => {
  return (
    <>
      <header class="prose mx-auto mb-6">
        <h1>🎬 Movie Quotes</h1>
      </header>
      <nav class="prose mx-auto mb-6 border-y border-gray-200 flex">
        <a
          href="/?sort=createdAt"
          class={`p-3 ${req.page === 'listing-createdAt' && navActiveClasses}`}
        >
          Latest quotes
        </a>
        <a
          href="/?sort=likes"
          class={`p-3 ${req.page === 'listing-likes' && navActiveClasses}`}
        >
          Top quotes
        </a>
        <a href="/add" class={`p-3 ${req.page === 'add' && navActiveClasses}`}>
          Add a quote
        </a>
      </nav>
      <section class="prose mx-auto">{children}</section>
    </>
  )
}
