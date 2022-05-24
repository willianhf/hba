import { UniqueIdentifier } from '~/shared/domain';
import { NBATeam } from '../domain';

export interface NBATeamRepository {
  findAll(): Promise<NBATeam[]>;
  findById(id: UniqueIdentifier): Promise<NBATeam>;
}
