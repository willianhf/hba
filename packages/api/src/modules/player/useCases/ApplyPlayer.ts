import { Actor } from '~/modules/auth/domain';
import { prismaSeasonRepository, SeasonRepository } from '~/modules/season/repos';
import { EntityNotFoundError, IUseCase, ValidationError } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { Player } from '../domain';
import { IconRepository, PlayerRepository, PositionRepository } from '../repos';
import { prismaIconRepository, prismaPlayerRepository, prismaPositionRepository } from '../repos/impl/Prisma';
import { findNBAPlayerService } from './FindNBAPlayer';

interface ApplyPlayerDTO {
  actor: Actor;
  nbaPlayerId: UniqueIdentifier;
  positionId: UniqueIdentifier;
  iconsIds: UniqueIdentifier[];
}

class ApplyPlayerUseCase implements IUseCase<ApplyPlayerDTO, Player> {
  public constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly positionRepository: PositionRepository,
    private readonly iconRepository: IconRepository
  ) {}

  public async execute(dto: ApplyPlayerDTO): Promise<Player> {
    const currentSeason = await this.seasonRepository.findCurrent();

    const position = await this.positionRepository.findById(dto.positionId);
    if (!position) {
      throw new EntityNotFoundError('The provided position does not exist');
    }

    const icons = await Promise.all(
      dto.iconsIds.map(async iconId => {
        const icon = await this.iconRepository.findById(iconId);
        if (!icon) {
          throw new EntityNotFoundError(`The icon "${iconId.toValue()}" does not exist`);
        }

        return icon;
      })
    );

    const canRequestPlayer = await this.playerRepository.canRequestPlayer(dto.actor.id, currentSeason.id);
    if (!canRequestPlayer) {
      throw new ValidationError('Você já tem uma inscrição pendente ou aprovada pra essa temporada.');
    }

    const nbaPlayer = await findNBAPlayerService.execute({ nbaPlayerId: dto.nbaPlayerId });
    const isNBAPlayerAvailable = await this.playerRepository.isNBAPlayerAvailable(nbaPlayer.id, currentSeason.id);
    if (!isNBAPlayerAvailable) {
      throw new ValidationError('O jogador escolhido já foi escolhido por outra pessoa.');
    }

    const player = new Player({
      actor: dto.actor,
      seasonId: currentSeason.id,
      nbaPlayer,
      position
    });

    player.setIcons(icons);

    await this.playerRepository.create(player);

    return player;
  }
}

export const applyPlayerUseCase = new ApplyPlayerUseCase(
  prismaPlayerRepository,
  prismaSeasonRepository,
  prismaPositionRepository,
  prismaIconRepository
);
