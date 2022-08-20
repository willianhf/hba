import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { ApprovalStatus, Team } from '../domain';

export interface TeamRepository {
  findByStatus(seasonId: IncIdentifier, status: ApprovalStatus): Promise<Team[]>;
  findById(id: UniqueIdentifier): Promise<Team>;
  create(team: Team): Promise<void>;
  isAvailable(nbaTeamId: UniqueIdentifier): Promise<boolean>;
}
