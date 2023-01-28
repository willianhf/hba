import { ApprovalStatus } from '@prisma/client';
import { Actor } from '~/modules/auth/domain';
import { SeasonId } from '~/modules/season/domain';
import { AggregateRoot, IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { Icon } from './Icon';
import { Icons } from './Icons';
import { NBAPlayer } from './NBAPlayer';
import { PlayerIcon } from './PlayerIcon';
import { Position } from './Position';

export { ApprovalStatus } from '@prisma/client';

interface PlayerProps {
  actor: Actor;
  seasonId: SeasonId;
  nbaPlayer: NBAPlayer;
  position: Position;
  status?: ApprovalStatus;
  icons?: Icons;
}

export class Player extends AggregateRoot<PlayerProps> {
  public constructor(props: PlayerProps, id?: UniqueIdentifier) {
    super(
      {
        ...props,
        status: props.status ?? ApprovalStatus.IDLE,
        icons: props.icons ?? new Icons()
      },
      id ?? new UniqueIdentifier()
    );
  }

  public get actor(): Actor {
    return this.props.actor;
  }

  public get seasonId(): IncIdentifier {
    return this.props.seasonId;
  }

  public get nbaPlayer(): NBAPlayer {
    return this.props.nbaPlayer;
  }

  public get position(): Position {
    return this.props.position;
  }

  public get icons(): Icons {
    return this.props.icons!;
  }

  public get status(): ApprovalStatus {
    return this.props.status!;
  }

  public setIcons(icons: Icon[]): void {
    icons.forEach(icon => this.icons.add(new PlayerIcon({ icon, playerId: this.id })));
  }

  public changeStatus(status: ApprovalStatus): void {
    this.props.status = status;
  }
}
