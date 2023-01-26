import { APIInteractionGuildMember, Guild, GuildMember, User } from 'discord.js';
import { DiscordActor, DiscordActorId } from '~/modules/auth/domain';
import { prismaDiscordActorRepository } from '~/modules/auth/repos/impl/prisma';
import { createDiscordActor } from '~/modules/auth/useCases';
import { ValidationError } from '~/shared/core';

export class DiscordActorFacade {
  public static async findOrRegister(
    user: User,
    memberOrGuild: Guild | GuildMember | APIInteractionGuildMember | null
  ): Promise<DiscordActor> {
    let discordActor = await prismaDiscordActorRepository.findById(new DiscordActorId(user.id));
    if (!discordActor) {
      let member;
      if (!memberOrGuild) {
        throw new ValidationError('Não é possível realizar o registro');
      }

      if (memberOrGuild instanceof Guild) {
        member = await memberOrGuild.members.fetch({ user });
      } else {
        member = memberOrGuild;
        if (!('displayName' in member)) {
          throw new ValidationError('Não é possível realizar o registro');
        }
      }

      discordActor = await createDiscordActor.execute({
        discordId: user.id,
        habboUsername: member.displayName
      });
    }

    return discordActor;
  }
}
