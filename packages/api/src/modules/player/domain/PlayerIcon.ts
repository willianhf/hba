import { AggregateRoot, ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';
import { Icon } from './Icon';

export type TeamActorIdentifier = ComposedIdentifier<{
  playerId: UniqueIdentifier;
  iconId: UniqueIdentifier;
}>;

interface PlayerIconProps {
  playerId: UniqueIdentifier;
  icon: Icon;
}

export class PlayerIcon extends AggregateRoot<PlayerIconProps, TeamActorIdentifier> {
  public constructor(props: PlayerIconProps, id?: TeamActorIdentifier) {
    super(props, id ?? new ComposedIdentifier({ playerId: props.playerId, iconId: props.icon.id }));
  }

  public get icon(): Icon {
    return this.props.icon;
  }

  public get playerId(): UniqueIdentifier {
    return this.props.playerId;
  }
}
