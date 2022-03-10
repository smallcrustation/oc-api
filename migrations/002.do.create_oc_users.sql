CREATE TABLE oc_users(
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);