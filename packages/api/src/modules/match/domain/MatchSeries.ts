import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';

export class MatchSeriesId extends UniqueIdentifier {}

interface MatchSeriesProps {
  name: string;
}

export class MatchSeries extends AggregateRoot<MatchSeriesProps, MatchSeriesId> {
  constructor(props: MatchSeriesProps, id?: MatchSeriesId) {
    super(props, id ?? new MatchSeriesId());
  }

  get name() {
    return this.props.name;
  }
}
