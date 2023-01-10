import { PermissionGuard } from '@discordx/utilities';
import {
  ApplicationCommandOptionType,
  AutocompleteInteraction,
  CommandInteraction,
  GuildMember,
  User
} from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { DiscordActorId } from '~/modules/auth/domain';
import { prismaDiscordActorRepository } from '~/modules/auth/repos/impl/prisma';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { ApprovalStatus, Conference, TeamId } from '~/modules/team/domain';
import { prismaNBATeamRepository, prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { applyTeamUseCase, changeTeamApprovalStatusUseCase } from '~/modules/team/useCases';
import { ValidationError } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { MessageBuilder } from '~/shared/infra/discord';
import { bot } from '~/shared/infra/discord/server';

@Discord()
@SlashGroup({
  name: 'team',
  description: 'Gerencia as equipes'
})
export class TeamCommands {
  @Slash({ description: 'Aplica-se para ser capitão de uma equipe' })
  @SlashGroup('team')
  async apply(
    @SlashChoice(...Object.keys(Conference))
    @SlashOption({
      description: 'Conferência',
      name: 'conference',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    _conference: Conference,
    @SlashOption({
      description: 'Equipe',
      name: 'team',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async (interaction: AutocompleteInteraction) => {
        const conference = interaction.options.getString('conference') as Conference | null;
        if (conference === 'EAST') {
          const eastTeams = await prismaNBATeamRepository.findByConference(conference);
          interaction.respond(eastTeams.map(team => ({ name: team.name, value: team.id.toValue() })));
        } else {
          const westTeams = await prismaNBATeamRepository.findByConference(Conference.WEST);
          interaction.respond(westTeams.map(team => ({ name: team.name, value: team.id.toValue() })));
        }
      }
    })
    nbaTeamId: string,
    @SlashOption({
      description: 'Sub-capitão',
      name: 'co_captain',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    coCaptain: User,
    interaction: CommandInteraction
  ): Promise<void> {
    const captainActor = await prismaDiscordActorRepository.findById(new DiscordActorId(interaction.user.id));
    if (!captainActor) {
      interaction.reply(
        new MessageBuilder('Você precisa se registrar para inscrever uma equipe.').kind('ERROR').build()
      );

      return;
    }

    const coCaptainActor = await prismaDiscordActorRepository.findById(new DiscordActorId(coCaptain.id));
    if (!coCaptainActor) {
      interaction.reply(new MessageBuilder('O sub-capitão precisa ser registrado.').kind('ERROR').build());

      return;
    }

    try {
      const team = await applyTeamUseCase.execute({
        captainActor: captainActor.actor,
        coCaptainActor: coCaptainActor.actor,
        nbaTeamId: new UniqueIdentifier(nbaTeamId)
      });

      coCaptain.send(
        `Você foi inscrito como sub-capitão da equipe ${team.nbaTeam.name} e ${team.roster.captain.habboUsername} como capitão.`
      );

      interaction.reply(new MessageBuilder('A inscrição da equipe foi enviada com sucesso.').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }

  @Slash({ description: 'Lista todas as inscrições de times da temporada' })
  @SlashGroup('team')
  async applications(interaction: CommandInteraction): Promise<void> {
    const season = await prismaSeasonRepository.findCurrent();

    const applications = await prismaTeamRepository.findByStatus(season.id, ApprovalStatus.IDLE);
    interaction.reply(
      new MessageBuilder()
        .codeBlock([
          `Inscrições de times pendente (Temporada ${season.name}):\n`,
          ...applications.map(
            application =>
              `${application.nbaTeam.name} | © ${application.roster.captain.habboUsername} & ${application.roster.coCaptain.habboUsername}`
          )
        ])
        .build()
    );
  }

  @Slash({ description: 'Aprova um time para a temporada atual' })
  @Guard(PermissionGuard(['Administrator']))
  @SlashGroup('team')
  async accept(
    @SlashOption({
      description: 'Equipe',
      name: 'team_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async (interaction: AutocompleteInteraction) => {
        const season = await prismaSeasonRepository.findCurrent();
        const applications = await prismaTeamRepository.findByStatus(season.id, ApprovalStatus.IDLE);

        interaction.respond(
          applications.map(application => ({
            name: `${application.nbaTeam.name} | © ${application.roster.captain.habboUsername} & ${application.roster.coCaptain.habboUsername}`,
            value: application.id.toValue()
          }))
        );
      }
    })
    teamId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const team = await prismaTeamRepository.findById(new TeamId(teamId));
      if (!team) {
        interaction.reply(new MessageBuilder('Time informado inválido.').kind('ERROR').build());
        return;
      }

      await changeTeamApprovalStatusUseCase.execute({ team, status: ApprovalStatus.ACCEPTED });

      interaction.reply(new MessageBuilder('Equipe aprovada com sucesso.').kind('SUCCESS').build());

      const captainActorDiscord = await prismaDiscordActorRepository.findByActorId(team.roster.captain.id);
      if (captainActorDiscord) {
        const season = await prismaSeasonRepository.findCurrent();
        const captainUser = await bot.users.fetch(captainActorDiscord.discordId);
        captainUser.send(
          `Sua inscrição da equipe ${team.nbaTeam.name} foi APROVADA para a temporada ${season.name} da HBA.`
        );
      }
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }

  @Slash({ description: 'Recusa um time para a temporada atual' })
  @Guard(PermissionGuard(['Administrator']))
  @SlashGroup('team')
  async deny(
    @SlashOption({
      description: 'Equipe',
      name: 'team_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async (interaction: AutocompleteInteraction) => {
        const season = await prismaSeasonRepository.findCurrent();
        const applications = await prismaTeamRepository.findByStatus(season.id, ApprovalStatus.IDLE);

        interaction.respond(
          applications.map(application => ({
            name: `${application.nbaTeam.name} | © ${application.roster.captain.habboUsername} & ${application.roster.coCaptain.habboUsername}`,
            value: application.id.toValue()
          }))
        );
      }
    })
    teamId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const team = await prismaTeamRepository.findById(new TeamId(teamId));
      if (!team) {
        interaction.reply(new MessageBuilder('Time informado inválido.').kind('ERROR').build());
        return;
      }

      await changeTeamApprovalStatusUseCase.execute({ team, status: ApprovalStatus.DENIED });

      interaction.reply(new MessageBuilder('Equipe reprovada com sucesso.').kind('SUCCESS').build());

      const captainActorDiscord = await prismaDiscordActorRepository.findByActorId(team.roster.captain.id);
      if (captainActorDiscord) {
        const season = await prismaSeasonRepository.findCurrent();
        const captainUser = await bot.users.fetch(captainActorDiscord.discordId);
        captainUser.send(
          `Sua inscrição da equipe ${team.nbaTeam.name} foi REPROVADA para a temporada ${season.name} da HBA.`
        );
      }
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      }
    }
  }
}
