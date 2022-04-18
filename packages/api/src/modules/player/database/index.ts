import { Prisma } from '@prisma/client';

export type ToPersistPlayer = Prisma.PlayerUncheckedCreateInput;
export const playerWithIcons = Prisma.validator<Prisma.PlayerArgs>()({
  include: {
    icons: true
  }
});
export type PersistedPlayer = Prisma.PlayerGetPayload<typeof playerWithIcons>;
