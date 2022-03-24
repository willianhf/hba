import { Service } from '~/shared/core/Service';
import { UniqueIdentifier } from '~/shared/domain';
import { NBAPlayer } from '../domain/NBAPlayer';
import { NBAAPIFacade } from '../facades/NBAAPI';
import { NBAPlayerRepository } from '../repos';
import { prismaNBAPlayerRepository } from '../repos/impl/Prisma';

interface FindNBAPlayerDTO {
  nbaPlayerId: UniqueIdentifier;
}

class FindNBAPlayerService implements Service<FindNBAPlayerDTO, NBAPlayer> {
  public constructor(private readonly nbaPlayerRepository: NBAPlayerRepository) {}

  public async execute(dto: FindNBAPlayerDTO): Promise<NBAPlayer> {
    let persistedNBAPlayer = await this.nbaPlayerRepository.findById(dto.nbaPlayerId);
    if (!persistedNBAPlayer) {
      const fetchedNBAPlayer = await NBAAPIFacade.fetchPlayerById(dto.nbaPlayerId);
      persistedNBAPlayer = await this.nbaPlayerRepository.create(fetchedNBAPlayer);
    }

    return persistedNBAPlayer;
  }
}

export const findNBAPlayerService = new FindNBAPlayerService(prismaNBAPlayerRepository);
