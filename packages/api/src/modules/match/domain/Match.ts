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

  get matchSeries(): MatchSeries | undefined {
    return this.props.matchSeries;
  }

  public toTableRow(): string {
    return `${this.awayTeam.nbaTeam.emoji} vs. ${this.homeTeam.nbaTeam.emoji}`;
  }
}
