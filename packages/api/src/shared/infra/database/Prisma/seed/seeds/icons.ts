import { Prisma } from '@prisma/client';
import { log } from '../log';
import { prisma } from '../prisma';

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

export async function seedIcons() {
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
