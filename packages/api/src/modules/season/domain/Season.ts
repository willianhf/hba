import { PersistableEntity } from '~/shared/domain/Entity';
import { IncIdentifier } from '~/shared/domain/IncIdentifier';

interface SeasonProps {
  name: string;
  isCurrent: boolean;
}

export class Season extends PersistableEntity<SeasonProps, IncIdentifier> {
  public constructor(props: SeasonProps, id?: IncIdentifier) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get isCurrent() : boolean {
    return this.props.isCurrent;
  }

  public setIsCurrent(isCurrent: boolean): void {
    this.props.isCurrent = isCurrent;
  }
}
