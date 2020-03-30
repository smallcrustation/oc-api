BEGIN;

TRUNCATE
  projects
  RESTART IDENTITY CASCADE;

INSERT INTO projects (
    imgUrls TEXT [],
    name TEXT NOT NULL,
    description TEXT,
    address TEXT,
    architect TEXT
  ) 
VALUES(
  '{"www.1pic.com", "www.2pic.com"}',
  'Project One'
);

COMMIT;