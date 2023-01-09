import { ApplicationCommandOptionType, AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { Conference } from '~/modules/team/domain';
import { prismaNBATeamRepository } from '~/modules/team/repos/impl/Prisma';

@Discord()
@SlashGroup({
  name: 'team',
  description: 'Gerencia uma equipe'
})
export class TeamCommands {
  @Slash({ description: 'Aplica-se para ser captão de uma equipe' })
  @SlashGroup('team')
  async apply(
    @SlashChoice(...Object.keys(Conference))
    @SlashOption({
      description: 'Conferência',
      name: 'conference',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    conference: Conference,
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
    interaction: CommandInteraction
  ): Promise<void> {
    interaction.reply('a');
    // try {
    //   await createSeasonService.execute({ name: season, isCurrent: !!isCurrent });

    //   interaction.reply(new MessageBuilder('Temporada criada com sucesso.').kind('SUCCESS').build());
    // } catch (ex) {
    //   if (ex instanceof ValidationError) {
    //     interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
    //   }
    // }
  }
}
