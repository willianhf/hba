import { stripIndents } from 'common-tags';
import { SeasonId } from '~/modules/season/domain';
import { Team } from '~/modules/team/domain';
import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';
import { MatchKind } from './MatchKind';
import { MatchSeries } from './MatchSeries';

export class MatchId extends UniqueIdentifier {}

interface MatchProps {
  seasonId: SeasonId;
  homeTeam: Team;
  awayTeam: Team;
  matchKind: MatchKind;
  scheduledTo?: Date;
  matchSeries?: MatchSeries;
}

export class Match extends AggregateRoot<MatchProps, MatchId> {
  constructor(props: MatchProps, id?: MatchId) {
    super(props, id ?? new MatchId());
  }

  get seasonId(): SeasonId {
    return this.props.seasonId;
  }

  get homeTeam(): Team {
    return this.props.homeTeam;
  }

  get awayTeam(): Team {
    return this.props.awayTeam;
  }

  get kind(): MatchKind {
    return this.props.matchKind;
  }

  get scheduledTo(): Date | undefined {
    return this.props.scheduledTo;
  }

  get series(): MatchSeries | undefined {
    return this.props.matchSeries;
  }

  get seriesName(): string {
    return this.series?.name ?? '';
  }

  get name(): string {
    if (this.series) {
      return `${this.seriesName} - ${this.awayTeam.nbaTeam.tricode} vs. ${this.homeTeam.nbaTeam.tricode}`;
    }

    return `${this.awayTeam.nbaTeam.tricode} vs. ${this.homeTeam.nbaTeam.tricode}`;
  }

  public toPlayoffsHeader(): string {
    return stripIndents(`
      ${this.homeTeam.nbaTeam.conferenceEmoji} \`${this.seriesName}\`
  `);
  }

  public toStandings(): string {
    return `${this.awayTeam.nbaTeam.emoji} vs. ${this.homeTeam.nbaTeam.emoji}`;
  }
}
