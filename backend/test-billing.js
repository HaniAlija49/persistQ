const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testBillingEndpoint() {
  try {
    // Get the user
    const user = await prisma.user.findFirst({
      where: { email: 'user-user_34wUUpBPFEKDe2os6id2iJ9K8SD@memoryhub.app' },
      include: {
        usageRecords: {
          where: {
            period: '2025-11'
          }
        }
      }
    });

    console.log('User found:', user ? 'Yes' : 'No');
    if (user) {
      console.log('Plan ID:', user.planId);
      console.log('Usage Records:', JSON.stringify(user.usageRecords, null, 2));

      const currentUsage = user.usageRecords[0];
      const apiCallsUsed = currentUsage?.apiCalls || 0;

      console.log('\nCalculated API calls used:', apiCallsUsed);
      console.log('Limit (Free plan): 5000');
      console.log('Percentage:', Math.round((apiCallsUsed / 5000) * 100) + '%');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testBillingEndpoint();
