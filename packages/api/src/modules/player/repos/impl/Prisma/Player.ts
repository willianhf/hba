import { playerWithIcons } from '~/modules/player/database';
import { ApprovalStatus } from '~/modules/player/domain/ApprovalStatus';
import { Player } from '~/modules/player/domain/Player';
import { PlayerMapper } from '~/modules/player/mapper';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { PlayerRepository } from '../../Player';

export class PrismaPlayerRepository implements PlayerRepository {
  public async create(player: Player): Promise<Player> {
    const toPersist = PlayerMapper.toPersist(player);

    const prismaPlayer = await prisma.player.create({ data: toPersist, ...playerWithIcons });

    return PlayerMapper.toDomain(prismaPlayer);
  }

  public async canRequestPlayer(userId: UniqueIdentifier, seasonId: IncIdentifier): Promise<boolean> {
    const prismaPlayer = await prisma.player.findFirst({
      where: {
        userId: userId.toValue(),
        seasonId: seasonId.toValue(),
        OR: [{ status: ApprovalStatus.ACCEPTED }, { status: ApprovalStatus.IDLE }]
      }
    });

    return !prismaPlayer;
  }

  public async isNBAPlayerAvailable(nbaPlayerId: UniqueIdentifier, seasonId: IncIdentifier): Promise<boolean> {
    const prismaPlayer = await prisma.player.findFirst({
      where: {
        nbaPlayerId: nbaPlayerId.toValue(),
        seasonId: seasonId.toValue(),
        status: ApprovalStatus.ACCEPTED
      }
    });

    return !prismaPlayer;
  }
}
