import { AggregateRoot, Identifier } from '~/shared/domain';
import { DiscordRoleCategory } from './RoleCategory';

export class DiscordRoleId extends Identifier<DiscordRoleCategory> {}

interface DiscordRoleProps {
  discordId: string;
  category: DiscordRoleCategory;
  name: string;
}

export class DiscordRole extends AggregateRoot<DiscordRoleProps, DiscordRoleId> {
  constructor(props: DiscordRoleProps, id?: DiscordRoleId) {
    super(props, id ?? new DiscordRoleId(props.category));
  }

  get discordId(): string {
    return this.props.discordId;
  }

  get name(): string {
    return this.props.name;
  }

  get category(): DiscordRoleCategory {
    return this.props.category;
  }
}
