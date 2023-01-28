import { ActorId } from '~/modules/auth/domain';
import { ActorMapper } from '~/modules/auth/mapper';
import { Mapper } from '~/shared/core/Mapper';
import { ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistedTeamActor, ToPersistTeamActor } from '../database';
import { TeamActor } from '../domain';

export class TeamActorMapper extends Mapper<TeamActor> {
  public static toDomain(persisted: PersistedTeamActor): TeamActor {
    const teamId = new UniqueIdentifier(persisted.teamId);
    const actor = ActorMapper.toDomain(persisted.actor);

    return new TeamActor(
      {
        teamId,
        actor,
        role: persisted.role
      },
      new ComposedIdentifier({ teamId, actorId: actor.id })
    );
  }

  public static toPersist(teamActor: TeamActor): ToPersistTeamActor {
    return {
      actorId: teamActor.actor.id.toValue(),
      teamId: teamActor.teamId.toValue(),
      role: teamActor.role
    };
  }
}
