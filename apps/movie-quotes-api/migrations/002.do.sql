CREATE TABLE movies (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- TODO: Add a foreign key constraint so quotes.movie_id must exist in movies.id
ALTER TABLE quotes ADD COLUMN movie_id INTEGER DEFAULT 0 REFERENCES movies(id);
