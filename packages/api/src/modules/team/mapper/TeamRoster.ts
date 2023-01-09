import { ActorId } from '~/modules/auth/domain';
import { Mapper } from '~/shared/core/Mapper';
import { ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistedTeamRoster, ToPersistTeamRoster } from '../database';
import { TeamRoster } from '../domain';

export class TeamRosterMapper extends Mapper<TeamRoster> {
  public static toDomain(persisted: PersistedTeamRoster): TeamRoster {
    const teamId = new UniqueIdentifier(persisted.teamId);
    const actorId = new ActorId(persisted.actorId);

    return new TeamRoster(
      {
        teamId,
        actorId,
        role: persisted.role
      },
      new ComposedIdentifier({ teamId, actorId })
    );
  }

  public static toPersist(teamRoster: TeamRoster): ToPersistTeamRoster {
    return {
      actorId: teamRoster.actorId.toValue(),
      teamId: teamRoster.teamId.toValue(),
      role: teamRoster.role
    };
  }
}
