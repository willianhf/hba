import { log } from './log';
import { prisma } from './prisma';
import { seedIcons, seedNBATeams, seedPositions } from './seeds';

async function main() {
  log('Start seeding...');

  await Promise.all([seedIcons(), seedPositions(), seedNBATeams()]);

  log('Seeding complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
