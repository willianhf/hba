import { Entity, UniqueIdentifier } from '~/shared/domain';

interface Props {
  name: string;
  motto: string;
}

export class HabboProfile extends Entity<Props, UniqueIdentifier> {
  constructor(props: Props, id: UniqueIdentifier) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get motto(): string {
    return this.props.motto;
  }
}
