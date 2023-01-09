import { ActorId } from '~/modules/auth/domain';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { TeamRoster, TeamRosterIdentifier, TeamRosterRole } from '../domain';

export interface TeamRosterRepository {
  findById(id: TeamRosterIdentifier): Promise<TeamRoster | null>;
  create(teamRoster: TeamRoster): Promise<void>;
  findByTeamId(teamId: UniqueIdentifier): Promise<TeamRoster[]>;
  findByRoles(teamId: UniqueIdentifier, roles: TeamRosterRole[]): Promise<TeamRoster[]>;
  isActorInRoster(actorId: ActorId, seasonId: IncIdentifier): Promise<boolean>;
  hasPendingApplication(actorId: ActorId, seasonId: IncIdentifier): Promise<boolean>;
}
