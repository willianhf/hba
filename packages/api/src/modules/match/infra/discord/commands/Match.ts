import { PermissionGuard } from '@discordx/utilities';
import { ApplicationCommandOptionType, AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { RoleGuard } from '~/modules/discord/infra/discord/guards';
import { MatchKind, MatchSeries } from '~/modules/match/domain';
import { prismaMatchSeriesRepository } from '~/modules/match/repos/impl/Prisma';
import { createMatchUseCase } from '~/modules/match/useCases';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { ApprovalStatus, Team, TeamId } from '~/modules/team/domain';
import { teamsCache } from '~/modules/team/infra/discord/cache';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';
import { cache } from '../cache';

@Discord()
@SlashGroup({
  name: 'match',
  description: 'Gerencia as partidas da temporada'
})
@SlashGroup('match')
export class MatchCommands {
  @Slash({ description: 'Cria uma partida na temporada' })
  @Guard(RoleGuard(['MOD'], { ephemeral: true }))
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
    @SlashChoice(
      'EASTERN CONFERENCE SEMI-FINALS',
      'EASTERN CONFERENCE FINALS',
      'WESTERN CONFERENCE SEMI-FINALS',
      'WESTERN CONFERENCE FINALS',
      'THE FINALS'
    )
    @SlashOption({
      description: 'Nome da série de partidas',
      name: 'series_name',
      type: ApplicationCommandOptionType.String
    })
    seriesName: string | null,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await interaction.deferReply({ ephemeral: true });

      if (homeTeamId === awayTeamId) {
        throw new ValidationError('As equipes não podem ser as mesmas');
      }

      const homeTeam = await prismaTeamRepository.findById(new TeamId(homeTeamId));
      if (!homeTeam) {
        throw new ValidationError('Equipe da casa informada inválida');
      }

      const awayTeam = await prismaTeamRepository.findById(new TeamId(awayTeamId));
      if (!awayTeam) {
        throw new ValidationError('Equipe visitante informada inválida');
      }

      if (matchKind !== MatchKind.REGULAR && !seriesName) {
        throw new ValidationError('É obrigatório informar o nome da série dos jogos');
      }

      const season = await prismaSeasonRepository.findCurrent();
      let matchSeries = seriesName ? await prismaMatchSeriesRepository.findByName(season.id, seriesName) : undefined;
      if (seriesName && !matchSeries) {
        matchSeries = new MatchSeries({ name: seriesName, seasonId: season.id });
        await prismaMatchSeriesRepository.create(matchSeries);
      }

      await createMatchUseCase.execute({
        season,
        homeTeam,
        awayTeam,
        matchKind,
        matchSeries: matchSeries ?? undefined
      });

      cache.invalidate('matches');

      interaction.editReply(new MessageBuilder('Partida criada com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        console.error(ex);
      }
    }
  }
}
