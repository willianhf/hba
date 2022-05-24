import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { TeamRoster, TeamRosterIdentifier } from '../domain';

export interface TeamRosterRepository {
  findById(id: TeamRosterIdentifier): Promise<TeamRoster | null>;
  create(teamRoster: TeamRoster): Promise<TeamRoster>;
  findByTeamId(teamId: UniqueIdentifier): Promise<TeamRoster[]>;
  isPlayerInRoster(playerId: UniqueIdentifier, seasonId: IncIdentifier): Promise<boolean>;
}
