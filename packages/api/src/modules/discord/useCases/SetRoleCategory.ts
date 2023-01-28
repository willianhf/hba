import { IUseCase } from '~/shared/core';
import { DiscordRole, DiscordRoleCategory } from '../domain';
import { DiscordRoleRepository } from '../repos';

interface SetDiscordRoleCategoryDTO {
  discordId: string;
  name: string;
  category: DiscordRoleCategory;
}

type SetDiscordRoleCategoryResult = DiscordRole;

export class SetDiscordRoleCategoryUseCase
  implements IUseCase<SetDiscordRoleCategoryDTO, SetDiscordRoleCategoryResult>
{
  constructor(private readonly discordRoleRepository: DiscordRoleRepository) {}

  public async execute(dto: SetDiscordRoleCategoryDTO): Promise<SetDiscordRoleCategoryResult> {
    const discordRole = new DiscordRole(dto);
    await this.discordRoleRepository.upsert(discordRole);

    return discordRole;
  }
}
