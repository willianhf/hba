import { IconCategory, Prisma } from '@prisma/client';
import { log } from '../log';
import { prisma } from '../prisma';

const icons: Prisma.IconCreateInput[] = [
  {
    id: '3PT',
    name: '3-PT Specialist',
    category: IconCategory.PRIMARY
  },
  {
    id: 'DK',
    name: 'Dunker',
    category: IconCategory.PRIMARY,
    enabled: false
  },
  {
    id: 'FN',
    name: 'Finisher',
    category: IconCategory.PRIMARY
  },
  {
    id: 'CS',
    name: 'Catch & Shoot Specialist',
    category: IconCategory.PRIMARY
  },
  {
    id: 'DE',
    name: 'Deadeye',
    category: IconCategory.PRIMARY,
    enabled: false
  },
  {
    id: 'ED',
    name: 'Elite Defender',
    category: IconCategory.PRIMARY,
    enabled: false
  },
  {
    id: 'IN',
    name: 'Intimidator',
    category: IconCategory.PRIMARY
  },
  {
    id: 'SB',
    name: 'Stepback Specialist',
    category: IconCategory.SECONDARY
  },
  {
    id: 'PP',
    name: 'Pick Pocket',
    category: IconCategory.SECONDARY
  },
  {
    id: 'BH',
    name: 'Ball Handler',
    category: IconCategory.SECONDARY
  },
  {
    id: 'BW',
    name: 'Brick Wall',
    category: IconCategory.SECONDARY
  },
  {
    id: 'BS',
    name: 'Break Starter',
    category: IconCategory.SECONDARY
  },
  {
    id: 'RE',
    name: 'Range Extender',
    category: IconCategory.SECONDARY
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
