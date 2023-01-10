import { BaseRepository } from '~/shared/core';
import { Actor } from '../domain';

export interface ActorRepository extends BaseRepository<Actor> {
  findByHabboUsername: (habboUsername: string) => Promise<Actor | null>;
}
