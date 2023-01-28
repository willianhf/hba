import { EntityNotFoundError, IUseCase } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { PlayerRepository } from '../repos';
import { ApprovalStatus, Player } from '../domain';
import { prismaPlayerRepository } from '../repos/impl/Prisma';

interface ChangePlayerStatusDTO {
  playerId: UniqueIdentifier;
  status: ApprovalStatus;
}

class ChangePlayerStatusUseCase implements IUseCase<ChangePlayerStatusDTO, Player> {
  public constructor(private readonly playerRepository: PlayerRepository) {}

  public async execute(dto: ChangePlayerStatusDTO): Promise<Player> {
    const player = await this.playerRepository.findById(dto.playerId);
    if (!player) {
      throw new EntityNotFoundError('Jogador informado inválido');
    }

    player.changeStatus(dto.status);
    await this.playerRepository.update(player);

    return player;
  }
}

export const changePlayerStatusUseCase = new ChangePlayerStatusUseCase(prismaPlayerRepository);
