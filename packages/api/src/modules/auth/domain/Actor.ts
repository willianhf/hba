import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';

export class ActorId extends UniqueIdentifier {}

interface ActorProps {
  habboUsername: string;
}

export class Actor extends AggregateRoot<ActorProps, ActorId> {
  constructor(props: ActorProps, id?: ActorId) {
    super(props, id ?? new ActorId());
  }

  get habboUsername(): string {
    return this.props.habboUsername;
  }
}
