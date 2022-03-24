import { prismaSeasonRepository, SeasonRepository } from '~/modules/season/repos';
import { User } from '~/modules/users/domain';
import { EntityNotFoundError, ValidationInputError } from '~/shared/core/Error';
import { Service } from '~/shared/core/Service';
import { UniqueIdentifier } from '~/shared/domain';
import { Player } from '../domain/Player';
import { IconRepository, PlayerRepository, PositionRepository } from '../repos';
import { prismaIconRepository, prismaPlayerRepository, prismaPositionRepository } from '../repos/impl/Prisma';
import { findNBAPlayerService } from './FindNBAPlayer';

interface CreatePlayerDTO {
  user: User;
  nbaPlayerId: string;
  positionId: string;
  iconsIds: string[];
}

class CreatePlayerService implements Service<CreatePlayerDTO, Player> {
  public constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly positionRepository: PositionRepository,
    private readonly iconRepository: IconRepository
  ) {}

  public async execute(dto: CreatePlayerDTO): Promise<Player> {
    const nbaPlayerId = new UniqueIdentifier(dto.nbaPlayerId);
    await findNBAPlayerService.execute({ nbaPlayerId });

    const currentSeason = await this.seasonRepository.findCurrent();

    const positionId = new UniqueIdentifier(dto.positionId);
    const position = await this.positionRepository.findById(positionId);
    if (!position) {
      throw new EntityNotFoundError('The provided position does not exist');
    }

    if (dto.iconsIds.length !== 2) {
      throw new ValidationInputError({ field: 'iconIds', message: `It's obrigatory to provide two iconIds` });
    }

    const iconIds = dto.iconsIds.map(id => new UniqueIdentifier(id));
    await Promise.all(
      iconIds.map(async iconId => {
        const icon = await this.iconRepository.findById(iconId);
        if (!icon) {
          throw new EntityNotFoundError(`The icon "${iconId.toValue()}" does not exist`);
        }

        return icon;
      })
    );

    const canRequestPlayer = await this.playerRepository.canRequestPlayer(dto.user.getId(), currentSeason.getId());
    if (!canRequestPlayer) {
      throw new ValidationInputError({
        field: 'nbaPlayerId',
        message: 'You already have an on-going player request or an accepted player'
      });
    }

    const isNBAPlayerAvailable = await this.playerRepository.isNBAPlayerAvailable(nbaPlayerId, currentSeason.getId());
    if (!isNBAPlayerAvailable) {
      throw new ValidationInputError({
        field: 'nbaPlayerId',
        message: 'The provided player is already selected by someone else'
      });
    }

    const player = Player.create({
      userId: dto.user.getId(),
      seasonId: currentSeason.getId(),
      nbaPlayerId,
      positionId,
      iconIds
    });

    const persitedPlayer = await this.playerRepository.create(player);
    return persitedPlayer;
  }
}

export const createPlayerService = new CreatePlayerService(
  prismaPlayerRepository,
  prismaSeasonRepository,
  prismaPositionRepository,
  prismaIconRepository
);
