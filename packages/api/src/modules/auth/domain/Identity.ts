import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';
import { ActorId } from './Actor';
import { Password } from './Password';
import { Username } from './Username';

export class IdentityId extends UniqueIdentifier {}

interface IdentityProps {
  username: Username;
  password?: Password | null;
  isVerified: boolean;
  createdAt: Date;
  actorId: ActorId;
}

export class Identity extends AggregateRoot<IdentityProps, IdentityId> {
  constructor(props: IdentityProps, id?: IdentityId) {
    super(props, id ?? new IdentityId());
  }

  get username(): Username {
    return this.props.username;
  }

  get password(): Password | null {
    return this.props.password ?? null;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  get actorId(): ActorId {
    return this.props.actorId;
  }
}
