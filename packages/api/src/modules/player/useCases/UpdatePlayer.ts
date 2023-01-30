import { prismaSeasonRepository, SeasonRepository } from '~/modules/season/repos';
import { IUseCase, ValidationError } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { Player } from '../domain';
import { IconRepository, PlayerRepository, PositionRepository } from '../repos';
import { prismaIconRepository, prismaPlayerRepository, prismaPositionRepository } from '../repos/impl/Prisma';
import { findNBAPlayerService } from './FindNBAPlayer';

interface UpdatePlayerDTO {
  player: Player;
  nbaPlayerId: UniqueIdentifier;
  positionId: UniqueIdentifier;
  iconsIds: UniqueIdentifier[];
}

class UpdatePlayerUseCase implements IUseCase<UpdatePlayerDTO, Player> {
  public constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly positionRepository: PositionRepository,
    private readonly iconRepository: IconRepository
  ) {}

  public async execute(dto: UpdatePlayerDTO): Promise<Player> {
    const currentSeason = await this.seasonRepository.findCurrent();

    const position = await this.positionRepository.findById(dto.positionId);
    if (!position) {
      throw new ValidationError('A posição informada não existe');
    }

    const icons = await Promise.all(
      dto.iconsIds.map(async iconId => {
        const icon = await this.iconRepository.findById(iconId);
        if (!icon) {
          throw new ValidationError(`O ícone "${iconId.toValue()}" não existe`);
        }

        return icon;
      })
    );

    const nbaPlayer = await findNBAPlayerService.execute({ nbaPlayerId: dto.nbaPlayerId });
    const isNBAPlayerAvailable = await this.playerRepository.isNBAPlayerAvailable(nbaPlayer.id, currentSeason.id, dto.player);
    if (!isNBAPlayerAvailable) {
      throw new ValidationError('O jogador selecionado já foi escolhido por outra pessoa');
    }

    dto.player.setNBAPlayer(nbaPlayer);
    dto.player.setPosition(position);
    dto.player.setIcons(icons);

    await this.playerRepository.update(dto.player);

    return dto.player;
  }
}

export const updatePlayerUseCase = new UpdatePlayerUseCase(
  prismaPlayerRepository,
  prismaSeasonRepository,
  prismaPositionRepository,
  prismaIconRepository
);
