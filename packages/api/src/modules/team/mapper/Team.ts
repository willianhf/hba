import { SeasonMapper } from '~/modules/season/mappers';
import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedTeam, ToPersistTeam } from '../database';
import { Team } from '../domain';
import { Roster } from '../domain/Roster';
import { NBATeamMapper } from './NBATeam';
import { TeamActorMapper } from './TeamActor';

export class TeamMapper extends Mapper<Team> {
  public static toDomain(persisted: PersistedTeam): Team {
    return new Team(
      {
        nbaTeam: NBATeamMapper.toDomain(persisted.nbaTeam),
        season: SeasonMapper.toDomain(persisted.season),
        status: persisted.approvalStatus,
        roster: new Roster(persisted.roster.map(TeamActorMapper.toDomain))
      },
      new UniqueIdentifier(persisted.id)
    );
  }

  public static toPersist(domain: Team): ToPersistTeam {
    return {
      id: domain.id.toValue(),
      nbaTeam: {
        connect: {
          id: domain.nbaTeam.id.toValue()
        }
      },
      season: {
        connect: {
          id: domain.season.id.toValue()
        }
      },
      approvalStatus: domain.status
    };
  }
}
