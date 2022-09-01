import { log } from '../log';
import { prisma } from '../prisma';

export async function seedSeason() {
  log('Seeding season...');

  const season = {
    id: 1,
    name: 'Temporada 1'
  };

  await prisma.season.upsert({
    where: { id: season.id },
    create: { ...season, isCurrent: true },
    update: season
  });
}
