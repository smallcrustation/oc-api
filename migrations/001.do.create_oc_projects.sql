CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  img_urls TEXT[],
  description  TEXT,
  address TEXT,
  architect TEXT,
  pretty_name TEXT,
  bedrooms TEXT,
  bathrooms TEXT, 
  square_footage TEXT,
  data_1 TEXT,
  data_2 TEXT,
  data_3 TEXT
);