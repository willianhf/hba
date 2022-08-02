import { Entity, UniqueIdentifier } from '~/shared/domain';

interface IconProps {
  name: string;
}

export class Icon extends Entity<IconProps> {
  public constructor(props: IconProps, id?: UniqueIdentifier) {
    super(props, id ?? new UniqueIdentifier());
  }

  public get name(): string {
    return this.props.name;
  }
}
