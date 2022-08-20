import { UserId } from '~/modules/users/domain';
import { Mapper } from '~/shared/core/Mapper';
import { ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistedTeamRoster, ToPersistTeamRoster } from '../database';
import { TeamRoster } from '../domain';

export class TeamRosterMapper extends Mapper<TeamRoster> {
  public static toDomain(persisted: PersistedTeamRoster): TeamRoster {
    const teamId = new UniqueIdentifier(persisted.teamId);
    const userId = new UserId(persisted.userId);

    return new TeamRoster(
      {
        teamId,
        userId,
        role: persisted.role
      },
      new ComposedIdentifier({ teamId, userId })
    );
  }

  public static toPersist(teamRoster: TeamRoster): ToPersistTeamRoster {
    return {
      userId: teamRoster.userId.toValue(),
      teamId: teamRoster.teamId.toValue(),
      role: teamRoster.role
    };
  }
}
