import { UserId } from '~/modules/users/domain';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { TeamRoster, TeamRosterIdentifier, TeamRosterRole } from '../domain';

export interface TeamRosterRepository {
  findById(id: TeamRosterIdentifier): Promise<TeamRoster | null>;
  create(teamRoster: TeamRoster): Promise<void>;
  findByTeamId(teamId: UniqueIdentifier): Promise<TeamRoster[]>;
  findByRoles(teamId: UniqueIdentifier, roles: TeamRosterRole[]): Promise<TeamRoster[]>;
  isUserInRoster(userId: UserId, seasonId: IncIdentifier): Promise<boolean>;
  hasPendingApplication(userId: UserId, seasonId: IncIdentifier): Promise<boolean>;
}
