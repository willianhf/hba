import { Actor } from '~/modules/auth/domain';
import { IUseCase, ValidationError } from '~/shared/core';
import { Team, TeamActor } from '../domain';
import { RosterRepository } from '../repos';

interface AddActorToRosterDTO {
  actor: Actor;
  team: Team;
}

type AddActorToRosterResult = Team;

export class AddActorToRosterUseCase implements IUseCase<AddActorToRosterDTO, AddActorToRosterResult> {
  public constructor(private readonly rosterRepository: RosterRepository) {}

  public async execute(dto: AddActorToRosterDTO): Promise<AddActorToRosterResult> {
    const isInRoster = await this.rosterRepository.isActorInRoster(dto.actor.id, dto.team.season.id);
    if (isInRoster) {
      throw new ValidationError('Esse jogador já está em um elenco');
    }

    const teamActor = new TeamActor({ actor: dto.actor, teamId: dto.team.id, role: 'PLAYER' });
    dto.team.addToRoster(teamActor);
    await this.rosterRepository.save(dto.team.roster);

    return dto.team;
  }
}
