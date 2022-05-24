import { Prisma } from '@prisma/client';
import { log } from '../log';
import { prisma } from '../prisma';

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

export async function seedPositions() {
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
