'use strict'

const quotes = [
  {
    quoteText: "Toto, I've got a feeling we're not in Kansas anymore.",
    saidBy: 'Dorothy Gale',
    movie: 'The Wizard of Oz'
  },
  {
    quoteText: "You're gonna need a bigger boat.",
    saidBy: 'Martin Brody',
    movie: 'Jaws'
  },
  {
    quoteText: 'May the Force be with you.',
    saidBy: 'Han Solo',
    movie: 'Star Wars'
  },
  {
    quoteText: 'I have always depended on the kindness of strangers.',
    saidBy: 'Blanche DuBois',
    movie: 'A Streetcar Named Desire'
  }
]

module.exports = async function ({ entities, db, sql }) {
  for (const values of quotes) {
    const movie = await entities.movie.save({ input: { name: values.movie } })

    console.log('Created movie:', movie)

    const quote = {
      quoteText: values.quoteText,
      saidBy: values.saidBy,
      movieId: movie.id
    }

    await entities.quote.save({ input: quote })

    console.log('Created quote:', quote)
  }
}
