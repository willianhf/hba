import { AggregateRoot, Identifier, UniqueIdentifier } from '~/shared/domain';
import { ActorId } from './Actor';

export class DiscordActorId extends Identifier<string> {}

interface DiscordActorProps {
  discordId: string;
  actorId: ActorId;
}

export class DiscordActor extends AggregateRoot<DiscordActorProps, DiscordActorId> {
  constructor(props: DiscordActorProps, id?: DiscordActorId) {
    super(props, id ?? new DiscordActorId(props.discordId));
  }

  get discordId(): string {
    return this.props.discordId;
  }

  get actorId(): ActorId {
    return this.props.actorId;
  }
}
