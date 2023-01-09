import { decodeGlobalID } from '@pothos/plugin-relay';
import { prismaSeasonRepository, SeasonRepository } from '~/modules/season/repos';
import { Actor } from '~/modules/auth/domain';
import { EntityNotFoundError, IUseCase, ValidationInputError } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { Player } from '../domain/Player';
import { IconRepository, PlayerRepository, PositionRepository } from '../repos';
import { prismaIconRepository, prismaPlayerRepository, prismaPositionRepository } from '../repos/impl/Prisma';
import { findNBAPlayerService } from './FindNBAPlayer';

interface CreatePlayerDTO {
  actor: Actor;
  nbaPlayerId: string;
  positionId: string;
  iconsIds: string[];
}

class CreatePlayerService implements IUseCase<CreatePlayerDTO, Player> {
  public constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly positionRepository: PositionRepository,
    private readonly iconRepository: IconRepository
  ) {}

  public async execute(dto: CreatePlayerDTO): Promise<Player> {
    const nbaPlayerId = new UniqueIdentifier(decodeGlobalID(dto.nbaPlayerId).id);
    await findNBAPlayerService.execute({ nbaPlayerId });

    const currentSeason = await this.seasonRepository.findCurrent();

    const positionId = new UniqueIdentifier(decodeGlobalID(dto.positionId).id);
    const position = await this.positionRepository.findById(positionId);
    if (!position) {
      throw new EntityNotFoundError('The provided position does not exist');
    }

    if (dto.iconsIds.length !== 2) {
      throw new ValidationInputError({ field: 'iconIds', message: `It's obrigatory to provide two iconIds` });
    }

    const iconIds = dto.iconsIds.map(id => new UniqueIdentifier(decodeGlobalID(id).id));
    await Promise.all(
      iconIds.map(async iconId => {
        const icon = await this.iconRepository.findById(iconId);
        if (!icon) {
          throw new EntityNotFoundError(`The icon "${iconId.toValue()}" does not exist`);
        }

        return icon;
      })
    );

    const canRequestPlayer = await this.playerRepository.canRequestPlayer(dto.actor.id, currentSeason.id);
    if (!canRequestPlayer) {
      throw new ValidationInputError({
        field: 'player',
        message: 'Você já tem uma inscrição ativa ou aprovada pra essa temporada.'
      });
    }

    const isNBAPlayerAvailable = await this.playerRepository.isNBAPlayerAvailable(nbaPlayerId, currentSeason.id);
    if (!isNBAPlayerAvailable) {
      throw new ValidationInputError({
        field: 'nbaPlayerId',
        message: 'O jogador escolhido já foi escolhido por outra pessoa.'
      });
    }

    const player = Player.create({
      actorId: dto.actor.id,
      seasonId: currentSeason.id,
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
