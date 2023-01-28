import { SeasonId } from '~/modules/season/domain';
import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';
import { Match } from './Match';

export class MatchSeriesId extends UniqueIdentifier {}

interface MatchSeriesProps {
  name: string;
  seasonId: SeasonId;
}

export class MatchSeries extends AggregateRoot<MatchSeriesProps, MatchSeriesId> {
  constructor(props: MatchSeriesProps, id?: MatchSeriesId) {
    super(props, id ?? new MatchSeriesId());
  }

  get name() {
    return this.props.name;
  }

  get seasonId() {
    return this.props.seasonId;
  }
}
