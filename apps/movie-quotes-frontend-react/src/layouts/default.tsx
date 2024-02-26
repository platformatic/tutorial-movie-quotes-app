import { Link } from 'react-router-dom'
import { useRouteContext } from '/:core.jsx'

export default ({ children }) => {
  const navActiveClasses = 'font-bold bg-yellow-400 no-underline'
  const { page } = useRouteContext().data

  return (
    <>
      <header className="prose mx-auto mb-6">
        <h1>🎬 Movie Quotes</h1>
      </header>
      <nav className="prose mx-auto mb-6 border-y border-gray-200 flex">
        <Link
          to={{ pathname: '/', search: '?sort=createdAt' }}
          className={`p-3 ${page === 'listing-createdAt' && navActiveClasses}`}
        >
          Latest quotes
        </Link>
        <Link
          to={{ pathname: '/', search: '?sort=likes' }}
          className={`p-3 ${page === 'listing-likes' && navActiveClasses}`}
        >
          Top quotes
        </Link>
        <Link to="/add" className={`p-3 ${page === 'add' && navActiveClasses}`}>
          Add a quote
        </Link>
      </nav>
      <section className="prose mx-auto">{children}</section>
    </>
  )
}
