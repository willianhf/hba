import { SeasonId } from '~/modules/season/domain';
import { TeamId } from '~/modules/team/domain';
import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';
import { MatchKind } from './MatchKind';
import { MatchSeriesId } from './MatchSeries';

export class MatchId extends UniqueIdentifier {}

interface MatchProps {
  seasonId: SeasonId;
  homeTeamId: TeamId;
  awayTeamId: TeamId;
  matchKind: MatchKind;
  scheduledTo?: Date;
  matchSeriesId?: MatchSeriesId;
}

export class Match extends AggregateRoot<MatchProps, MatchId> {
  constructor(props: MatchProps, id?: MatchId) {
    super(props, id ?? new MatchId());
  }

  get seasonId(): SeasonId {
    return this.props.seasonId;
  }

  get homeTeamId(): TeamId {
    return this.props.homeTeamId;
  }

  get awayTeamId(): TeamId {
    return this.props.awayTeamId;
  }

  get kind(): MatchKind {
    return this.props.matchKind;
  }

  get scheduledTo(): Date | undefined {
    return this.props.scheduledTo;
  }

  get matchSeriesId(): MatchSeriesId | undefined {
    return this.props.matchSeriesId;
  }
}
