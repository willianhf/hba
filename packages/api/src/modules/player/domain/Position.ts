import { Entity, UniqueIdentifier } from '~/shared/domain';

interface PositionProps {
  name: string;
}

export class Position extends Entity<PositionProps> {
  public constructor(props: PositionProps, id?: UniqueIdentifier) {
    super(props, id ?? new UniqueIdentifier());
  }

  public get name(): string {
    return this.props.name;
  }
}
