import { Conference } from '@prisma/client';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';

interface NBATeamProps {
  name: string;
  conference: Conference;
  tricode: string;
  nickname: string;
}

export class NBATeam extends PersistableEntity<NBATeamProps, UniqueIdentifier> {
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
}
