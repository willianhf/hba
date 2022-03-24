import { UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';

interface PositionProps {
  name: string;
}

export class Position extends PersistableEntity<PositionProps, UniqueIdentifier> {
  public constructor(props: PositionProps, id?: UniqueIdentifier) {
    super(props, id);
  }

  public get name(): string {
    return this.props.name;
  }
}