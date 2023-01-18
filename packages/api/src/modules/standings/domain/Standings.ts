import { stripIndents } from 'common-tags';
import { Season } from '~/modules/season/domain';
import { Conference } from '~/modules/team/domain';
import { ValueObject } from '~/shared/domain';
import { TeamStandings } from './TeamStandings';

interface StandingsProps {
  teamsStandings: TeamStandings[];
}

export class Standings extends ValueObject<StandingsProps> {
  public constructor(props: StandingsProps) {
    super(props);
    this.sort();
  }

  public setTeamStandings(teamStandings: TeamStandings[]): void {
    this.props.teamsStandings = teamStandings;
    this.sort();
  }

  private sort(): void {
    this.props.teamsStandings.sort(
      (a, b) =>
        b.wins - a.wins ||
        b.conferenceWins - a.conferenceWins ||
        a.wonAgainst(b.team) ||
        a.team.nbaTeam.name.localeCompare(b.team.nbaTeam.name)
    );
  }

  get east(): TeamStandings[] {
    return this.props.teamsStandings.filter(standings => standings.team.nbaTeam.conference === Conference.EAST);
  }

  get west(): TeamStandings[] {
    return this.props.teamsStandings.filter(standings => standings.team.nbaTeam.conference === Conference.WEST);
  }

  public getTable(season: Season): string {
    return stripIndents(`
      :small_blue_diamond: Habbo Basketball Association :small_blue_diamond: Season ${season.name} :small_blue_diamond:

      \`\`\`ts
      EASTERN CONFERENCE
      \`\`\`\`\`\`
      | # | Team                    | G  | W  | L  | CONF |  %   | LAST 3  | P |
      |---+-------------------------+----+----+----+------+------+---------+---|
      ${this.east.map(standings => standings.toTableRow()).join('\n')}
      \`\`\`
      \`\`\`prolog
      WESTERN CONFERENCE
      \`\`\`\`\`\`
      | # | Team                    | G  | W  | L  | CONF |  %   | LAST 3  | P |
      |---+-------------------------+----+----+----+------+------+---------+---|
      ${this.west.map(standings => standings.toTableRow()).join('\n')}
      \`\`\`\`\`\`
      % - WIN PERCENTAGE | LAST 3 - LAST 3 GAMES | P - CLINCHED PLAYOFFS
      \`\`\`
    `);
  }
}
