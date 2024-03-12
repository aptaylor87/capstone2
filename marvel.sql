\echo 'Delete and recreate react_marvel db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE react_marvel;
CREATE DATABASE react_marvel;
\connect react_marvel

\i marvel-schema.sql
-- \i jobly-seed.sql

\echo 'Delete and recreate react_marvel_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE react_marvel_test;
CREATE DATABASE react_marvel_test;
\connect react_marvel_test

\i marvel-schema.sql