/**
 * Quick migration script to add api_key_prefix column
 * Run with: node prisma/migrations/manual/apply-migration.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrate() {
  console.log('🔄 Starting migration: Add api_key_prefix column...');

  try {
    // Step 1: Add the column (nullable)
    console.log('Step 1: Adding api_key_prefix column...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS api_key_prefix VARCHAR(12);
    `);
    console.log('✅ Column added');

    // Step 2: Populate from existing api_key values
    console.log('Step 2: Populating api_key_prefix from existing keys...');
    await prisma.$executeRawUnsafe(`
      UPDATE users
      SET api_key_prefix = LEFT(api_key, 12)
      WHERE api_key IS NOT NULL AND api_key_prefix IS NULL;
    `);
    console.log('✅ Data populated');

    // Step 3: Create index for fast lookups
    console.log('Step 3: Creating index on api_key_prefix...');
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_users_api_key_prefix ON users(api_key_prefix);
    `);
    console.log('✅ Index created');

    console.log('');
    console.log('🎉 Migration completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Restart your backend server');
    console.log('2. Test API key generation/retrieval');
    console.log('3. After 24-48 hours of testing, you can drop the old api_key column');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

migrate()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
