import { Prisma, PrismaClient } from '@prisma/client';
import { Logger } from '~/shared/core/Logger';

const prisma = new PrismaClient();

const log = Logger.create('🌱');

const icons: Prisma.IconCreateInput[] = [
  {
    id: '3PT',
    name: '3-PT Specialist'
  },
  {
    id: 'DK',
    name: 'Dunker'
  },
  {
    id: 'SB',
    name: 'Stepback Specialist'
  },
  {
    id: 'CS',
    name: 'Corner Specialist'
  },
  {
    id: 'DE',
    name: 'Deadeye'
  },
  {
    id: 'ED',
    name: 'Elite Defender'
  }
];

async function seedIcons() {
  log('Seeding icons...');

  await Promise.all(
    icons.map(icon =>
      prisma.icon.upsert({
        where: { id: icon.id },
        create: icon,
        update: icon
      })
    )
  );
}

const positions: Prisma.PositionCreateInput[] = [
  {
    id: 'PG',
    name: 'Point Guard'
  },
  {
    id: 'SG',
    name: 'Shooting Guard'
  },
  {
    id: 'SF',
    name: 'Small Forward'
  },
  {
    id: 'PF',
    name: 'Power Forward'
  },
  {
    id: 'C',
    name: 'Center'
  }
];

async function seedPositions() {
  log('Seeding positions...');

  await Promise.all(
    positions.map(position =>
      prisma.position.upsert({
        where: { id: position.id },
        create: position,
        update: position
      })
    )
  );
}

async function main() {
  log('Start seeding...');

  await Promise.all([seedIcons(), seedPositions()]);

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
