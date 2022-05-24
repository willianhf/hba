import { Mapper } from '~/shared/core/Mapper';
import { ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistedTeamRoster, ToPersistTeamRoster } from '../database';
import { TeamRoster } from '../domain';

export class TeamRosterMapper extends Mapper<TeamRoster> {
  public static toDomain(persisted: PersistedTeamRoster): TeamRoster {
    const teamId = new UniqueIdentifier(persisted.teamId);
    const playerId = new UniqueIdentifier(persisted.playerId);

    return new TeamRoster(
      {
        teamId,
        playerId,
        role: persisted.role
      },
      new ComposedIdentifier({ teamId, playerId })
    );
  }

  public static toPersist(teamRoster: TeamRoster): ToPersistTeamRoster {
    return {
      playerId: teamRoster.playerId.toValue(),
      teamId: teamRoster.teamId.toValue(),
      role: teamRoster.role
    };
  }
}
