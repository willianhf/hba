import { AggregateRoot, Identifier } from '~/shared/domain';
import { Actor } from './Actor';

export class DiscordActorId extends Identifier<string> {}

interface DiscordActorProps {
  discordId: string;
  actor: Actor;
}

export class DiscordActor extends AggregateRoot<DiscordActorProps, DiscordActorId> {
  constructor(props: DiscordActorProps, id?: DiscordActorId) {
    super(props, id ?? new DiscordActorId(props.discordId));
  }

  get discordId(): string {
    return this.props.discordId;
  }

  get actor(): Actor {
    return this.props.actor;
  }
}
