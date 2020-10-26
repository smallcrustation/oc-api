CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  pretty_name TEXT,
  img_urls TEXT[],
  description  TEXT,
  address TEXT,
  architect TEXT,
  beds SMALLINT,
  baths DECIMAL,
  sqft INT,
  year_built DATE
);