import { ActorId } from '~/modules/auth/domain';
import { SeasonId } from '~/modules/season/domain';
import { Roster } from '../domain/Roster';

export interface RosterRepository {
  create(roster: Roster): Promise<void>;
  save(roster: Roster): Promise<void>;
  isActorInRoster(actorId: ActorId, seasonId: SeasonId): Promise<boolean>;
  hasPendingApplication(actorId: ActorId, seasonId: SeasonId): Promise<boolean>;
}
