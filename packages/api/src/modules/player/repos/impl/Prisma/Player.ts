import { playerWithIcons } from '~/modules/player/database';
import { ApprovalStatus } from '~/modules/player/domain/ApprovalStatus';
import { Player } from '~/modules/player/domain/Player';
import { PlayerMapper } from '~/modules/player/mapper';
import { ActorId } from '~/modules/auth/domain';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { PlayerRepository } from '../../Player';

export class PrismaPlayerRepository implements PlayerRepository {
  public async create(player: Player): Promise<Player> {
    const toPersist = PlayerMapper.toPersist(player);

    const prismaPlayer = await prisma.player.create({ data: toPersist, ...playerWithIcons });

    return PlayerMapper.toDomain(prismaPlayer);
  }

  public async findById(id: UniqueIdentifier): Promise<Player> {
    const prismaPlayer = await prisma.player.findFirst({
      where: {
        id: id.toValue()
      },
      ...playerWithIcons,
      rejectOnNotFound: true
    });

    return PlayerMapper.toDomain(prismaPlayer);
  }

  public async canRequestPlayer(actorId: ActorId, seasonId: IncIdentifier): Promise<boolean> {
    const prismaPlayers = await prisma.player.findMany({
      where: {
        actorId: actorId.toValue(),
        seasonId: seasonId.toValue()
      }
    });

    if (prismaPlayers.length === 0) {
      return true;
    }

    return prismaPlayers.every(player => player.status === ApprovalStatus.DENIED);
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

  public async findByActorAndSeason(actorId: ActorId, seasonId: IncIdentifier): Promise<Player[]> {
    const prismaPlayers = await prisma.player.findMany({
      where: {
        actorId: actorId.toValue(),
        seasonId: seasonId.toValue()
      },
      ...playerWithIcons
    });

    return prismaPlayers.map(PlayerMapper.toDomain);
  }

  public async findAll(seasonId: IncIdentifier): Promise<Player[]> {
    const prismaPlayers = await prisma.player.findMany({
      where: {
        seasonId: seasonId.toValue(),
        status: ApprovalStatus.ACCEPTED
      },
      ...playerWithIcons
    });

    return prismaPlayers.map(PlayerMapper.toDomain);
  }

  public async findActorActivePlayer(actorId: ActorId, seasonId: IncIdentifier): Promise<Player | null> {
    const prismaPlayer = await prisma.player.findFirst({
      where: {
        actorId: actorId.toValue(),
        seasonId: seasonId.toValue(),
        status: ApprovalStatus.ACCEPTED
      },
      ...playerWithIcons
    });

    if (!prismaPlayer) {
      return null;
    }

    return PlayerMapper.toDomain(prismaPlayer);
  }
}
