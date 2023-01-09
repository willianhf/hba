import { Mapper } from '~/shared/core/Mapper';
import { PersistedDiscordRole, ToPersistDiscordRole } from '../database';
import { DiscordRole, DiscordRoleId } from '../domain';

export class DiscordRoleMapper extends Mapper<DiscordRole> {
  public static toDomain(persisted: PersistedDiscordRole): DiscordRole {
    return new DiscordRole(
      {
        category: persisted.category,
        discordId: persisted.discordId,
        name: persisted.name
      },
      new DiscordRoleId(persisted.category)
    );
  }

  public static toPersistence(discordRole: DiscordRole): ToPersistDiscordRole {
    return {
      name: discordRole.name,
      discordId: discordRole.discordId,
      category: discordRole.category
    };
  }
}
