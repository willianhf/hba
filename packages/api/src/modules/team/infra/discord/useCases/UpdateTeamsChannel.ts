import { ApprovalStatus } from '@prisma/client';
import { DiscordChannelCategory } from '~/modules/discord/domain';
import { DiscordChannelRepository } from '~/modules/discord/repos';
import { deleteChannelMessagesUseCase, syncChannelMessageUseCase } from '~/modules/discord/useCases';
import { SeasonRepository } from '~/modules/season/repos';
import { Conference, Team } from '~/modules/team/domain';
import { TeamRepository } from '~/modules/team/repos';
import { IUseCase, ValidationError } from '~/shared/core';
import { MessageBuilder } from '~/shared/infra/discord';
import { bot } from '~/shared/infra/discord/server';
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
    const channelCategory = DiscordChannelCategory.TEAMS;
    const teamsChannel = await this.discordChannelRepository.findByCategory(channelCategory);
    if (!teamsChannel) {
      throw new ValidationError('Você precisa definir o canal de times');
    }

    const discordTeamsChannel = await bot.channels.fetch(teamsChannel.discordId);
    if (!discordTeamsChannel) {
      throw new ValidationError('Não foi possível encontrar o canal de times');
    }

    if (discordTeamsChannel.isTextBased()) {
      const season = await this.seasonRepository.findCurrent();
      await deleteChannelMessagesUseCase.execute({ season, channelCategory, discordChannel: discordTeamsChannel });

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

      await syncChannelMessageUseCase.execute({
        channelCategory,
        season,
        discordChannel: discordTeamsChannel,
        message: content
      });
    }
  }
}
