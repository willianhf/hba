import { Icons } from '~/modules/player/domain';
import { PlayerIconMapper } from '~/modules/player/mapper';
import { prisma } from '~/shared/infra/database';
import { PlayerIconRepository } from '../..';

export class PrismaPlayerIconRepository implements PlayerIconRepository {
  public async create(icons: Icons): Promise<void> {
    const data = icons.getItems().map(PlayerIconMapper.toPersist);

    await prisma.playerIcon.createMany({ data });
  }

  public async save(icons: Icons): Promise<void> {
    if (icons.getNewItems().length > 0) {
      const data = icons.getNewItems().map(PlayerIconMapper.toPersist);

      await prisma.playerIcon.createMany({ data });
    }

    if (icons.getRemovedItems().length > 0) {
      const removedIds = icons
        .getRemovedItems()
        .map(playerIcon => ({ iconId: playerIcon.icon.id.toValue(), playerId: playerIcon.playerId.toValue() }));

      await prisma.playerIcon.deleteMany({
        where: {
          iconId: {
            in: removedIds.map(removedId => removedId.iconId)
          },
          playerId: {
            in: removedIds.map(removedId => removedId.playerId)
          }
        }
      });
    }
  }
}
