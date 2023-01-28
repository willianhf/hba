import { ApprovalStatus } from '@prisma/client';
import { DiscordChannelCategory } from '~/modules/discord/domain';
import { DiscordChannelRepository } from '~/modules/discord/repos';
import { SeasonRepository } from '~/modules/season/repos';
import { TeamRepository } from '~/modules/team/repos';
import { Conference, Team } from '~/modules/team/domain';
import { IUseCase, ValidationError } from '~/shared/core';
import { stripIndent } from 'common-tags';
import { bot } from '~/shared/infra/discord/server';
import { MessageBuilder } from '~/shared/infra/discord';
import { TextTable } from '~/shared/infra/discord/TextTable';

type UpdateTeamsChannelDTO = void;

type UpdateTeamsChannelResult = void;

export class UpdateTeamsChannelUseCase implements IUseCase<UpdateTeamsChannelDTO, UpdateTeamsChannelResult> {
  public constructor(
    private readonly discordChannelRepository: DiscordChannelRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly teamRepository: TeamRepository
  ) {}

  private getConferenceTable(teams: Team[]): TextTable {
    const table = new TextTable();

    teams.forEach(team => {
      table.cell(`${team.nbaTeam.tricode} ${team.nbaTeam.nickname}`, `© ${team.roster.captain.habboUsername}`);
      table.cell(`${team.nbaTeam.tricode} ${team.nbaTeam.nickname}`, `s ${team.roster.coCaptain.habboUsername}`);
      team.roster.players.forEach(teamActor => {
        table.cell(`${team.nbaTeam.tricode} ${team.nbaTeam.nickname}`, teamActor.actor.habboUsername);
      });
    });

    return table;
  }

  public async execute(): Promise<void> {
    const teamsChannel = await this.discordChannelRepository.findByCategory(DiscordChannelCategory.TEAMS);
    if (!teamsChannel) {
      throw new ValidationError('Você precisa definir o canal de times');
    }

    const discordTeamsChannel = await bot.channels.fetch(teamsChannel.discordId);
    if (!discordTeamsChannel) {
      throw new ValidationError('Não foi possível encontrar o canal de times');
    }

    if (discordTeamsChannel.isTextBased()) {
      const messages = await discordTeamsChannel.messages.fetch();
      messages.forEach(message => message.delete());

      const season = await this.seasonRepository.findCurrent();
      const teams = await this.teamRepository.findByStatus(season.id, ApprovalStatus.ACCEPTED);
      const east = teams.filter(team => team.nbaTeam.conference === Conference.EAST);
      const west = teams.filter(team => team.nbaTeam.conference === Conference.WEST);

      const eastTable = this.getConferenceTable(east);
      const westTable = this.getConferenceTable(west);

      const { content } = new MessageBuilder()
        .codeBlock('EASTERN CONFERENCE', east.at(0)?.nbaTeam.conferenceColor)
        .codeBlock(eastTable.render())
        .newLine()
        .codeBlock('WESTERN CONFERENCE', west.at(0)?.nbaTeam.conferenceColor)
        .codeBlock(westTable.render())
        .newLine()
        .codeBlock('© = Capitão | s = Sub-capitão')
        .build();

      discordTeamsChannel.send(content);
    }
  }
}
