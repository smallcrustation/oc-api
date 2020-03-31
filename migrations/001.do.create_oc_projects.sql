CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  img_urls TEXT[],
  description  TEXT,
  address TEXT,
  architect TEXT
);