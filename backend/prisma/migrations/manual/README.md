# Manual Database Migration Guide

## Security Update: Remove Plaintext API Key Storage

This migration removes plaintext API key storage for improved security.

### Changes

1. **Add `api_key_prefix` column**: Stores first 12 characters of API keys (e.g., `mh_a1b2c3d4`) for UI display
2. **Make `api_key_hash` NOT NULL**: All API keys must be hashed
3. **Eventually remove `api_key` column**: Plaintext keys will be removed after verification

### Migration Steps

#### Step 1: Run the Migration (Safe Phase)

```bash
cd backend
psql $MEMORYHUB_DATABASE_URL -f prisma/migrations/manual/001_add_api_key_prefix.sql
```

This adds the `api_key_prefix` column and populates it. The `api_key` column is **kept** for now.

#### Step 2: Deploy Code Changes

Deploy the updated code that uses hash-based authentication.

#### Step 3: Verify Everything Works

Test that:
- ✅ Existing API keys still work
- ✅ New API keys are generated correctly
- ✅ API key regeneration works
- ✅ UI shows partial keys (prefixes) correctly

#### Step 4: Monitor for Issues

Monitor for 24-48 hours to ensure no authentication failures.

#### Step 5: Remove Plaintext Column (Final Phase)

Once verified, uncomment Step 6 and Step 7 in the migration SQL and run:

```bash
psql $MEMORYHUB_DATABASE_URL <<EOF
ALTER TABLE users DROP COLUMN IF EXISTS api_key;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_api_key_key;
EOF
```

### Rollback Plan

If issues arise before dropping the `api_key` column:

1. Revert code to previous version
2. The `api_key` column still exists, so old code will work
3. You can drop the `api_key_prefix` column if needed:

```sql
ALTER TABLE users DROP COLUMN IF EXISTS api_key_prefix;
```

### What Changed in the Code

**Backend:**
- `lib/auth.ts`: Now uses bcrypt hash validation with prefix-based lookup
- `app/api/api-keys/route.ts`: Returns only API key prefix, full key shown once
- `app/api/webhooks/clerk/route.ts`: Creates users with hash + prefix
- `prisma/schema.prisma`: Removed `apiKey` field, added `apiKeyPrefix`

**Security Improvements:**
- ✅ API keys never stored in plaintext
- ✅ Database compromise doesn't leak usable keys
- ✅ Constant-time hash comparison
- ✅ Fast lookups via prefix index

### Testing Checklist

- [ ] Run migration on staging database
- [ ] Test existing API key authentication
- [ ] Test new API key generation
- [ ] Test API key regeneration
- [ ] Verify UI shows partial keys correctly
- [ ] Monitor error logs for 24-48 hours
- [ ] Run final cleanup (drop api_key column)

### Support

If you encounter issues:
1. Check error logs: `npm run logs` (production) or console output (development)
2. Verify database schema: `psql $MEMORYHUB_DATABASE_URL -c "\d users"`
3. Check Sentry for authentication errors
