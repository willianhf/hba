import { IconCategory } from '@prisma/client';
import { Entity, UniqueIdentifier } from '~/shared/domain';
export { IconCategory } from '@prisma/client';

interface IconProps {
  name: string;
  category: IconCategory;
  enabled?: boolean;
}

export class Icon extends Entity<IconProps> {
  public constructor(props: IconProps, id?: UniqueIdentifier) {
    super({ ...props, enabled: props.enabled ?? true }, id ?? new UniqueIdentifier());
  }

  public get name(): string {
    return this.props.name;
  }

  public get category(): IconCategory {
    return this.props.category;
  }

  public get enabled(): boolean {
    return this.props.enabled!;
  }
}
