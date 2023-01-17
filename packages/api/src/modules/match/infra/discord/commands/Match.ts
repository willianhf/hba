import { ApplicationCommandOptionType, AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { MatchKind, MatchSeries } from '~/modules/match/domain';
import { createMatchUseCase } from '~/modules/match/useCases';
import { ApprovalStatus, Team, TeamId } from '~/modules/team/domain';
import { teamsCache } from '~/modules/team/infra/discord/cache';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';

@Discord()
@SlashGroup({
  name: 'match',
  description: 'Gerencia as partidas da temporada'
})
@SlashGroup('match')
export class MatchCommands {
  @Slash({ description: 'Cria uma partida na temporada' })
  async create(
    @SlashOption({
      description: 'Equipe casa',
      name: 'home_team_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (interaction: AutocompleteInteraction) {
        const awayTeamId = interaction.options.getString('away_team_id');
        const teams = await teamsCache.getOr<Team[]>(`teams:${ApprovalStatus.ACCEPTED}`, []);
        interaction.respond(
          teams
            .filter(team => team.id.toValue() !== awayTeamId)
            .map(team => ({ name: team.toTeamRow(), value: team.id.toString() }))
        );
      }
    })
    homeTeamId: string,
    @SlashOption({
      description: 'Equipe visitante',
      name: 'away_team_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (interaction: AutocompleteInteraction) {
        const homeTeamId = interaction.options.getString('home_team_id');
        const teams = await teamsCache.getOr<Team[]>(`teams:${ApprovalStatus.ACCEPTED}`, []);
        interaction.respond(
          teams
            .filter(team => team.id.toValue() !== homeTeamId)
            .map(team => ({ name: team.toTeamRow(), value: team.id.toString() }))
        );
      }
    })
    awayTeamId: string,
    @SlashChoice(...Object.values(MatchKind))
    @SlashOption({
      description: 'Tipo de partida',
      name: 'match_kind',
      type: ApplicationCommandOptionType.String,
      required: true
    })
    matchKind: MatchKind,
    @SlashChoice(...Object.values(MatchKind))
    @SlashOption({
      description: 'Nome da série',
      name: 'series_name',
      type: ApplicationCommandOptionType.String
    })
    seriesName: string | null,
    interaction: CommandInteraction
  ): Promise<void> {
    if (homeTeamId === awayTeamId) {
      interaction.reply(new MessageBuilder('As equipes não podem ser as mesmas').kind('ERROR').build());
      return;
    }

    try {
      const homeTeam = await prismaTeamRepository.findById(new TeamId(homeTeamId));
      if (!homeTeam) {
        interaction.reply(new MessageBuilder('Equipe da casa informada inválida').kind('ERROR').build());
        return;
      }

      const awayTeam = await prismaTeamRepository.findById(new TeamId(awayTeamId));
      if (!awayTeam) {
        interaction.reply(new MessageBuilder('Equipe visitante informada inválida').kind('ERROR').build());
        return;
      }

      await createMatchUseCase.execute({
        homeTeam,
        awayTeam,
        matchKind,
        matchSeries: seriesName ? new MatchSeries({ name: seriesName }) : undefined
      });

      interaction.reply(new MessageBuilder('Partida criada com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        console.error(ex);
      }
    }
  }
}
