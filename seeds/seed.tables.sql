BEGIN;
TRUNCATE projects RESTART IDENTITY CASCADE;
INSERT INTO projects (name, img_urls, description, address, architect)
VALUES
  (
    'Project One',
    '{"https://i.imgur.com/JrdChYg.jpg", "www.2pic.com"}',
    null,
    null,
    null
  ),
  (
    'Project Two',
    '{"www.1pic.com", "www.2pic.com"}',
    null,
    null,
    null
  );
COMMIT;