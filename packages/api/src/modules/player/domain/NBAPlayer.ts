import { Entity, UniqueIdentifier } from '~/shared/domain';

interface NBAPlayerProps {
  firstName: string;
  lastName: string;
}

export class NBAPlayer extends Entity<NBAPlayerProps> {
  public constructor(props: NBAPlayerProps, id: UniqueIdentifier) {
    super(props, id);
  }

  public get firstName(): string {
    return this.props.firstName;
  }

  public get lastName(): string {
    return this.props.lastName;
  }

  public get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
