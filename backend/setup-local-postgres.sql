-- Run this script in your local PostgreSQL 17 to create the mtsms user and database
-- You can run it using: psql postgres < setup-local-postgres.sql
-- Or paste it into any PostgreSQL GUI tool (Postico, pgAdmin, TablePlus, etc.)

-- Create the mtsms role if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'mtsms') THEN
      CREATE ROLE mtsms WITH LOGIN PASSWORD 'mtsms_dev_password';
      RAISE NOTICE 'Role mtsms created';
   ELSE
      RAISE NOTICE 'Role mtsms already exists';
   END IF;
END
$$;

-- Grant privileges
ALTER ROLE mtsms CREATEDB;
ALTER ROLE mtsms WITH SUPERUSER;  -- Needed for Hibernate DDL operations

-- Create the database if it doesn't exist
SELECT 'CREATE DATABASE mtsms OWNER mtsms'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mtsms')\gexec

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE mtsms TO mtsms;

-- Display confirmation
\echo 'Setup complete! You can now connect with:'
\echo 'Database: mtsms'
\echo 'User: mtsms'
\echo 'Password: mtsms_dev_password'
