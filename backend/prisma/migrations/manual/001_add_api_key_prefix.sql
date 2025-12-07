-- Migration: Add api_key_prefix column for secure API key management
-- This migration adds the api_key_prefix column and populates it from existing api_key values
-- The api_key column will eventually be removed once all keys are migrated

-- Step 1: Add the new api_key_prefix column (nullable initially)
ALTER TABLE users ADD COLUMN IF NOT EXISTS api_key_prefix VARCHAR(12);

-- Step 2: Populate api_key_prefix from existing api_key values
-- Extract first 12 characters (e.g., "mh_a1b2c3d4")
UPDATE users
SET api_key_prefix = LEFT(api_key, 12)
WHERE api_key IS NOT NULL AND api_key_prefix IS NULL;

-- Step 3: Make api_key_hash NOT NULL (it should already have values from previous migrations)
-- First ensure all users have api_key_hash
UPDATE users
SET api_key_hash = crypt(api_key, gen_salt('bf', 10))
WHERE api_key_hash IS NULL AND api_key IS NOT NULL;

-- Now make it NOT NULL
ALTER TABLE users ALTER COLUMN api_key_hash SET NOT NULL;

-- Step 4: Make api_key_prefix NOT NULL after population
ALTER TABLE users ALTER COLUMN api_key_prefix SET NOT NULL;

-- Step 5: Create index on api_key_prefix for fast lookups
CREATE INDEX IF NOT EXISTS idx_users_api_key_prefix ON users(api_key_prefix);

-- Step 6: Drop the api_key column (DANGEROUS - only run after verifying all users migrated)
-- UNCOMMENT THE LINE BELOW ONLY AFTER TESTING AND VERIFICATION:
-- ALTER TABLE users DROP COLUMN IF EXISTS api_key;

-- Step 7: Remove the unique constraint on api_key if it still exists
-- UNCOMMENT THE LINE BELOW ONLY AFTER DROPPING THE COLUMN:
-- ALTER TABLE users DROP CONSTRAINT IF EXISTS users_api_key_key;

-- NOTES:
-- 1. The api_key column is kept temporarily for backward compatibility
-- 2. Once verified that all API keys work with hash-based auth, uncomment Step 6
-- 3. Test the migration on a staging database first
-- 4. Back up your database before running this migration
