import { BaseRepository } from '~/shared/core';
import { DiscordRole, DiscordRoleCategory } from '../domain';

export interface DiscordRoleRepository extends BaseRepository<DiscordRole> {
  findByCategory: (category: DiscordRoleCategory) => Promise<DiscordRole | null>;
  findMany: (...categories: DiscordRoleCategory[]) => Promise<DiscordRole[]>
  upsert: (discordRole: DiscordRole) => Promise<void>;
}
