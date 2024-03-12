CREATE TABLE characters (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    image_type TEXT
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE comics (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    image_type TEXT,
    marvel_URL TEXT  -- corrected the syntax here
);

CREATE TABLE reading_lists (
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    comic_id INTEGER REFERENCES comics ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

