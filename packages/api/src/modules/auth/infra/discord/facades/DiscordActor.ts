import { CommandInteraction } from 'discord.js';
import { DiscordActor, DiscordActorId } from '~/modules/auth/domain';
import { prismaDiscordActorRepository } from '~/modules/auth/repos/impl/prisma';
import { createDiscordActor } from '~/modules/auth/useCases';
import { ValidationError } from '~/shared/core';

export class DiscordActorFacade {
  public static async findOrRegister(interaction: CommandInteraction): Promise<DiscordActor> {
    let discordActor = await prismaDiscordActorRepository.findById(new DiscordActorId(interaction.user.id));
    if (!discordActor) {
      if (!interaction.member || !('displayName' in interaction.member)) {
        throw new ValidationError('Não é possível realizar o seu registro.');
      }

      discordActor = await createDiscordActor.execute({
        discordId: interaction.user.id,
        habboUsername: interaction.member.displayName
      });
    }

    return discordActor;
  }
}
