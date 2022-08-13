import { UniqueIdentifier } from '~/shared/domain';
import { Team } from '../domain';

export interface TeamRepository {
  findAll(): Promise<Team[]>;
  findById(id: UniqueIdentifier): Promise<Team>;
  create(team: Team): Promise<Team>;
  isAvailable(nbaTeamId: UniqueIdentifier): Promise<boolean>;
}
