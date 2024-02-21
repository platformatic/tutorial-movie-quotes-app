import styles from './QuoteActionLike.module.css'

document.body.addEventListener('htmx:afterRequest', ({ detail }) => {
  if (detail.elt.hasAttribute('data-like-quote')) {
    detail.elt.classList.add(styles.liked)
    detail.elt.classList.remove('cursor-pointer')
  }
})
