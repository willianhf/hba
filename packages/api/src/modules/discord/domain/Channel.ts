import { AggregateRoot, Identifier, IncIdentifier } from '~/shared/domain';
import { DiscordChannelCategory } from './ChannelCategory';

export class DiscordChannelId extends Identifier<DiscordChannelCategory> {}

interface DiscordChannelProps {
  discordId: string;
  name: string;
  category: DiscordChannelCategory;
}

export class DiscordChannel extends AggregateRoot<DiscordChannelProps, DiscordChannelId> {
  constructor(props: DiscordChannelProps, id?: DiscordChannelId) {
    super(props, id ?? new DiscordChannelId(props.category));
  }

  get discordId(): string {
    return this.props.discordId;
  }

  get name(): string {
    return this.props.name;
  }

  get category(): DiscordChannelCategory {
    return this.props.category;
  }
}
