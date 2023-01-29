import { SeasonId } from '~/modules/season/domain';
import { AggregateRoot, Identifier } from '~/shared/domain';
import { DiscordChannelCategory } from './ChannelCategory';

export class DiscordChannelMessageId extends Identifier<DiscordChannelCategory> {}

interface DiscordChannelMessageProps {
  discordId: string;
  seasonId: SeasonId;
  category: DiscordChannelCategory;
}

export class DiscordChannelMessage extends AggregateRoot<DiscordChannelMessageProps, DiscordChannelMessageId> {
  constructor(props: DiscordChannelMessageProps, id?: DiscordChannelMessageId) {
    super(props, id ?? new DiscordChannelMessageId(props.category));
  }

  get discordId(): string {
    return this.props.discordId;
  }

  get category(): DiscordChannelCategory {
    return this.props.category;
  }

  get seasonId(): SeasonId {
    return this.props.seasonId;
  }
}
