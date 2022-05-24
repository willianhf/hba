import { Mapper } from '~/shared/core/Mapper';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistedTeam, ToPersistTeam } from '../database';
import { Team } from '../domain';

export class TeamMapper extends Mapper<Team> {
  public static toDomain(persisted: PersistedTeam): Team {
    return new Team(
      {
        nbaTeamId: new UniqueIdentifier(persisted.nbaTeamId),
        seasonId: new IncIdentifier(persisted.seasonId),
        status: persisted.approvalStatus
      },
      new UniqueIdentifier(persisted.id)
    );
  }

  public static toPersist(domain: Team): ToPersistTeam {
    return {
      nbaTeamId: domain.nbaTeamId.toValue(),
      seasonId: domain.seasonId.toValue(),
      approvalStatus: domain.status
    };
  }
}
