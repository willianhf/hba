import { UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';

interface NBAPlayerProps {
  firstName: string;
  lastName: string;
}

export class NBAPlayer extends PersistableEntity<NBAPlayerProps, UniqueIdentifier> {
  public constructor(props: NBAPlayerProps, id: UniqueIdentifier) {
    super(props, id);
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }
}
