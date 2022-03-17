import { UnexpectedError } from '../core/Error';
import { Identifier } from './Identifier';

export abstract class Entity<Props> {
  constructor(protected readonly props: Props) {
    this.props = props;
  }
}

export abstract class PersistableEntity<Props, TIdentifier extends Identifier<any>> extends Entity<Props> {
  constructor(protected readonly props: Props, protected readonly id?: TIdentifier) {
    super(props);
  }

  public getId(): TIdentifier {
    if (!this.id) {
      throw new UnexpectedError('Entity is not persisted yet.');
    }

    return this.id;
  }
}
