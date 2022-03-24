import { UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';

interface IconProps {
  name: string;
}

export class Icon extends PersistableEntity<IconProps, UniqueIdentifier> {
  public constructor(props: IconProps, id?: UniqueIdentifier) {
    super(props, id);
  }

  public get name(): string {
    return this.props.name;
  }
}
