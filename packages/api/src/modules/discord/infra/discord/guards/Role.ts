import type { BaseMessageOptions, CommandInteraction, Guild } from 'discord.js';
import { GuildMember } from 'discord.js';
import type { Client, GuardFunction, Next } from 'discordx';
import { SimpleCommandMessage } from 'discordx';
import { DiscordRoleCategory } from '~/modules/discord/domain';
import { prismaDiscordRoleRepository } from '~/modules/discord/repos/impl/prisma';

type PermissionHandler = CommandInteraction | SimpleCommandMessage;

type PermissionOptions = BaseMessageOptions & {
  ephemeral?: boolean;
};

export function RoleGuard(
  roleCategories: DiscordRoleCategory[],
  options?: PermissionOptions
): GuardFunction<PermissionHandler> {
  async function replyOrFollowUp(interaction: CommandInteraction, replyOptions: PermissionOptions): Promise<void> {
    if (interaction.replied) {
      await interaction.followUp(replyOptions);
      return;
    }

    if (interaction.deferred) {
      await interaction.editReply(replyOptions);
      return;
    }

    await interaction.reply(replyOptions);

    return;
  }

  async function send(arg: PermissionHandler, message: PermissionOptions): Promise<void> {
    if (arg instanceof SimpleCommandMessage) {
      await arg?.message.reply(message);
    } else {
      await replyOrFollowUp(arg, message);
    }
  }

  // send message
  async function post(arg: PermissionHandler, roleCategories: DiscordRoleCategory[]): Promise<void> {
    const finalResponse = options ?? {
      content: `you need \`\`${roleCategories.join(', ')}\`\` permissions for this command`
    };

    send(arg, finalResponse);

    return;
  }

  return async function (arg: PermissionHandler, _client: Client, next: Next) {
    let guild: Guild | null = null;
    let callee: GuildMember | null = null;

    if (arg instanceof SimpleCommandMessage) {
      if (arg.message.inGuild()) {
        guild = arg.message.guild;
        callee = arg.message.member;
      }
    } else {
      guild = arg.guild;
      if (arg.member instanceof GuildMember) {
        callee = arg.member;
      }
    }

    if (!guild || !callee) {
      return next();
    }

    const discordRoles = await prismaDiscordRoleRepository.findMany(...roleCategories);
    if (discordRoles.length === 0) {
      return send(arg, { content: `Algum dos cargos ${roleCategories.join(', ')} não foi definido`, ephemeral: true });
    }

    const isAllowed =
      callee.permissions.has('Administrator') || callee.roles.cache.hasAny(...discordRoles.map(role => role.discordId));
    if (isAllowed) {
      return next();
    }

    return post(arg, roleCategories);
  };
}
