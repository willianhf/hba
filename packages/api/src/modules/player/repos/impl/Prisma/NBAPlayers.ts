import { NBAPlayer } from '~/modules/player/domain/NBAPlayer';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { NBAPlayerRepository } from '../../NBAPlayer';

export class PrismaNBAPlayerRepository implements NBAPlayerRepository {
  public async findById(id: UniqueIdentifier): Promise<NBAPlayer | null> {
    const prismaNBAPlayer = await prisma.nBAPlayer.findUnique({ where: { id: id.toValue() } });
    if (!prismaNBAPlayer) {
      return null;
    }

    return new NBAPlayer(prismaNBAPlayer, new UniqueIdentifier(prismaNBAPlayer.id));
  }

  public async create(nbaPlayer: NBAPlayer): Promise<NBAPlayer> {
    const toPersist = {
      id: nbaPlayer.id.toValue(),
      firstName: nbaPlayer.firstName,
      lastName: nbaPlayer.lastName
    };
    const prismaNBAPlayer = await prisma.nBAPlayer.create({ data: toPersist });

    return new NBAPlayer(prismaNBAPlayer, new UniqueIdentifier(prismaNBAPlayer.id));
  }
}
