const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.link.create({
    data: {
      url: 'learn-rust.org',
      description: 'a docs website'
    }
  });

  const allLinks = await prisma.link.findMany();

  console.log('allLinks ==>', allLinks);
}

(async () => {
  try {
    await main();
    await prisma.$disconnect();
    
  } catch (err) {
    console.error(err);
  }
})();
