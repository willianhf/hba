import { BaseRepository } from '~/shared/core';
import { ActorId, DiscordActor } from '../domain';

export interface DiscordActorRepository extends BaseRepository<DiscordActor> {
  findByActorId(actorId: ActorId): Promise<DiscordActor | null>
}
