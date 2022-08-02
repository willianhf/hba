import { AggregateRoot, IncIdentifier } from '~/shared/domain';

interface SeasonProps {
  name: string;
  isCurrent: boolean;
}

export class Season extends AggregateRoot<SeasonProps, IncIdentifier> {
  public constructor(props: SeasonProps, id?: IncIdentifier) {
    super(props, id ?? new IncIdentifier());
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
