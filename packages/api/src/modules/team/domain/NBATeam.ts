import { Conference } from '@prisma/client';
import { DiscordEmojiFacade } from '~/modules/discord/facades';
import { Entity, UniqueIdentifier } from '~/shared/domain';

export { Conference } from '@prisma/client';

interface NBATeamProps {
  name: string;
  conference: Conference;
  tricode: string;
  nickname: string;
}

export class NBATeam extends Entity<NBATeamProps> {
  public constructor(props: NBATeamProps, id: UniqueIdentifier) {
    super(props, id);
  }

  public get name(): string {
    return this.props.name;
  }

  public get conference(): Conference {
    return this.props.conference;
  }

  public get tricode(): string {
    return this.props.tricode;
  }

  public get nickname(): string {
    return this.props.nickname;
  }

  public get emoji(): string {
    return DiscordEmojiFacade.getEmojiByName(this.tricode.toLowerCase());
  }
}
