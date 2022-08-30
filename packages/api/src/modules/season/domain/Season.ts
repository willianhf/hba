import { AggregateRoot, IncIdentifier } from '~/shared/domain';

export class SeasonId extends IncIdentifier {}

interface SeasonProps {
  name: string;
  isCurrent: boolean;
}

export class Season extends AggregateRoot<SeasonProps, SeasonId> {
  public constructor(props: SeasonProps, id?: SeasonId) {
    super(props, id ?? new SeasonId());
  }

  get name(): string {
    return this.props.name;
  }

  get isCurrent(): boolean {
    return this.props.isCurrent;
  }

  public setIsCurrent(isCurrent: boolean): void {
    this.props.isCurrent = isCurrent;
  }
}
