CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  imgUrls TEXT[],
  name TEXT NOT NULL,
  description  TEXT,
  address TEXT,
  architect TEXT
);