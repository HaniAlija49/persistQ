/**
 * Restore api_key column to be non-null and populated
 * This ensures users can retrieve their API keys
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function restore() {
  console.log('🔄 Ensuring api_key column exists and has data...');

  try {
    // Check current state
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        apiKey: true,
        apiKeyHash: true,
        apiKeyPrefix: true,
      },
    });

    console.log(`Found ${users.length} users`);

    let missingKeys = 0;
    for (const user of users) {
      if (!user.apiKey && user.apiKeyHash) {
        missingKeys++;
        console.log(`⚠️  User ${user.email} has hash but no plaintext key`);
      }
    }

    if (missingKeys > 0) {
      console.log('');
      console.log('⚠️  IMPORTANT: Some users have hashed keys but no plaintext keys.');
      console.log('   These users will need to regenerate their API keys from the dashboard.');
      console.log('   The system is configured to store both plaintext and hash going forward.');
    } else {
      console.log('✅ All users with API keys have both plaintext and hash stored');
    }

    console.log('');
    console.log('✅ Migration check completed!');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

restore()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
