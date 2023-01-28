import { Prisma } from '@prisma/client';
export { NBAPlayer as PersistedNBAPlayer, Position as PersistedPosition, Icon as PersistedIcon } from '@prisma/client';

export const playerIconWithRelations = Prisma.validator<Prisma.PlayerIconArgs>()({
  include: {
    icon: true
  }
});
export type PersistedPlayerIcon = Prisma.PlayerIconGetPayload<typeof playerIconWithRelations>;

export const playerWithRelations = Prisma.validator<Prisma.PlayerArgs>()({
  include: {
    icons: {
      include: {
        icon: true
      }
    },
    actor: true,
    nbaPlayer: true,
    position: true
  }
});
export type PersistedPlayer = Prisma.PlayerGetPayload<typeof playerWithRelations>;

export type ToPersistPlayer = Prisma.PlayerUncheckedCreateInput;
export type ToPersistNBAPlayer = Prisma.NBAPlayerUncheckedCreateInput;
export type ToPersistPosition = Prisma.PositionUncheckedCreateInput;
export type ToPersistIcon = Prisma.IconUncheckedCreateInput;
export type ToPersistPlayerIcon = Prisma.PlayerIconUncheckedCreateInput;
