import { BaseRepository } from '~/shared/core';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { ApprovalStatus, Team } from '../domain';

export interface TeamRepository extends BaseRepository<Team> {
  findByStatus(seasonId: IncIdentifier, status: ApprovalStatus): Promise<Team[]>;
  isAvailable(nbaTeamId: UniqueIdentifier): Promise<boolean>;
  update(team: Team): Promise<void>;
}
