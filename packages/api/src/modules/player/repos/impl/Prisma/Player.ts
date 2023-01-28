import { ActorId } from '~/modules/auth/domain';
import { playerWithRelations } from '~/modules/player/database';
import { ApprovalStatus, Player } from '~/modules/player/domain';
import { PlayerMapper } from '~/modules/player/mapper';
import { SeasonId } from '~/modules/season/domain';
import { UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { PlayerRepository } from '../../Player';
import { PlayerIconRepository } from '../../PlayerIcon';

export class PrismaPlayerRepository implements PlayerRepository {
  public constructor(private readonly playerIconRepository: PlayerIconRepository) {}

  public async create(player: Player): Promise<void> {
    const data = PlayerMapper.toPersist(player);
    await prisma.player.create({ data });

    await this.playerIconRepository.create(player.icons);
  }

  public async update(player: Player): Promise<void> {
    const data = PlayerMapper.toPersist(player);
    await prisma.player.update({ where: { id: player.id.toValue() }, data });
  }

  public async findById(id: UniqueIdentifier): Promise<Player | null> {
    const prismaPlayer = await prisma.player.findFirst({
      where: {
        id: id.toValue()
      },
      ...playerWithRelations
    });

    if (!prismaPlayer) {
      return null;
    }

    return PlayerMapper.toDomain(prismaPlayer);
  }

  public async canRequestPlayer(actorId: ActorId, seasonId: SeasonId): Promise<boolean> {
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

  public async isNBAPlayerAvailable(nbaPlayerId: UniqueIdentifier, seasonId: SeasonId): Promise<boolean> {
    const prismaPlayer = await prisma.player.findFirst({
      where: {
        nbaPlayerId: nbaPlayerId.toValue(),
        seasonId: seasonId.toValue(),
        status: ApprovalStatus.ACCEPTED
      }
    });

    return !prismaPlayer;
  }

  public async findByActorAndSeason(actorId: ActorId, seasonId: SeasonId): Promise<Player[]> {
    const prismaPlayers = await prisma.player.findMany({
      where: {
        actorId: actorId.toValue(),
        seasonId: seasonId.toValue()
      },
      ...playerWithRelations
    });

    return prismaPlayers.map(PlayerMapper.toDomain);
  }

  public async findAll(seasonId: SeasonId): Promise<Player[]> {
    const prismaPlayers = await prisma.player.findMany({
      where: {
        seasonId: seasonId.toValue(),
        status: ApprovalStatus.ACCEPTED
      },
      ...playerWithRelations
    });

    return prismaPlayers.map(PlayerMapper.toDomain);
  }

  public async findByStatus(seasonId: SeasonId, status: ApprovalStatus): Promise<Player[]> {
    const prismaPlayers = await prisma.player.findMany({
      where: {
        seasonId: seasonId.toValue(),
        status
      },
      ...playerWithRelations
    });

    return prismaPlayers.map(PlayerMapper.toDomain);
  }

  public async findActorActivePlayer(actorId: ActorId, seasonId: SeasonId): Promise<Player | null> {
    const prismaPlayer = await prisma.player.findFirst({
      where: {
        actorId: actorId.toValue(),
        seasonId: seasonId.toValue(),
        status: ApprovalStatus.ACCEPTED
      },
      ...playerWithRelations
    });

    if (!prismaPlayer) {
      return null;
    }

    return PlayerMapper.toDomain(prismaPlayer);
  }
}
