import { UniqueIdentifier } from '~/shared/domain';
import { Conference, NBATeam } from '../domain';

export interface NBATeamRepository {
  findAll(): Promise<NBATeam[]>;
  findByConference(conference: Conference): Promise<NBATeam[]>
  findById(id: UniqueIdentifier): Promise<NBATeam>;
}
