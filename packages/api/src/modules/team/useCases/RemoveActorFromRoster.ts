import { Actor } from '~/modules/auth/domain';
import { IUseCase, ValidationError } from '~/shared/core';
import { Team } from '../domain';
import { RosterRepository } from '../repos';

interface RemoveActorFromRosterDTO {
  actor: Actor;
  team: Team;
}

type RemoveActorFromRosterResult = Team;

export class RemoveActorFromRosterUseCase implements IUseCase<RemoveActorFromRosterDTO, RemoveActorFromRosterResult> {
  public constructor(private readonly rosterRepository: RosterRepository) {}

  public async execute(dto: RemoveActorFromRosterDTO): Promise<RemoveActorFromRosterResult> {
    const teamActor = dto.team.roster.players.find(teamActor => teamActor.actor.equals(dto.actor));
    if (!teamActor) {
      throw new ValidationError('Esse jogador não está no elenco desta equipe');
    }

    dto.team.removeFromRoster(teamActor);
    await this.rosterRepository.save(dto.team.roster);

    return dto.team;
  }
}
